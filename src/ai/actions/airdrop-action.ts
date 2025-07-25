
'use server';

import { z } from 'zod';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const airdropFormSchema = z.object({
  walletAddress: z.string(),
  twitterHandle: z.string(),
  telegramUsername: z.string(),
  email: z.string().email(),
  howHeard: z.string().optional(),
  hasCompletedSteps: z.boolean(),
});

type AirdropFormValues = z.infer<typeof airdropFormSchema>;

export async function submitAirdrop(data: AirdropFormValues): Promise<{ success: boolean; error?: string }> {
  // Validate data with Zod server-side
  const parsedData = airdropFormSchema.safeParse(data);
  if (!parsedData.success) {
    console.error('Invalid data received:', parsedData.error);
    return { success: false, error: 'Invalid data format.' };
  }

  const {
    walletAddress,
    twitterHandle,
    telegramUsername,
    email,
    howHeard,
  } = parsedData.data;

  try {
    // Check for required environment variables
    const { GOOGLE_SHEET_ID, GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } = process.env;
    if (!GOOGLE_SHEET_ID || !GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      throw new Error('Required Google credentials are not set in the environment.');
    }

    // Authenticate with Google Service Account
    const serviceAccountAuth = new JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Important for Vercel/env variables
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Initialize the Google Spreadsheet
    const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);
    
    // Load document properties and worksheets
    await doc.loadInfo(); 
    
    // Get the first worksheet
    const sheet = doc.sheetsByIndex[0];

    // Define header values if the sheet is new/empty
    const headerValues = [
      'Timestamp',
      'Wallet Address',
      'Twitter Handle',
      'Telegram Username',
      'Email',
      'How Heard',
    ];

    // Ensure headers exist
    await sheet.setHeaderRow(headerValues);

    // Add a new row with the form data
    await sheet.addRow({
      'Timestamp': new Date().toISOString(),
      'Wallet Address': walletAddress,
      'Twitter Handle': twitterHandle,
      'Telegram Username': telegramUsername,
      'Email': email,
      'How Heard': howHeard || 'N/A',
    });

    console.log('Successfully added a new row to the spreadsheet.');

    return { success: true };

  } catch (error) {
    console.error('Error writing to Google Sheet:', error);
    if (error instanceof Error) {
        if (error.message.includes('403')) {
            return { success: false, error: 'Permission denied. Make sure the service account email has Editor access to the Google Sheet.' };
        }
        if (error.message.includes('404')) {
             return { success: false, error: 'Spreadsheet not found. Please check the GOOGLE_SHEET_ID.' };
        }
    }
    return { success: false, error: 'Could not submit your entry. Please try again later.' };
  }
}
