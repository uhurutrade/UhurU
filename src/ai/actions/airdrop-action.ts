
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
    // Process the private key - handle all possible .env formats robustly
    let cleanKey = (process.env.GOOGLE_PRIVATE_KEY || '')
      .replace(/^["']|["']$/g, '')   // strip surrounding quotes if present
      .replace(/\\n/g, '\n')          // convert literal \n to real newlines
      .trim();

    // Validate the key has proper PEM structure
    if (!cleanKey.startsWith('-----BEGIN')) {
      throw new Error('GOOGLE_PRIVATE_KEY does not appear to be a valid PEM key.');
    }

    const serviceAccountAuth = new JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: cleanKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Initialize the Google Spreadsheet
    const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);
    
    // Load document properties and worksheets
    await doc.loadInfo(); 
    
    // Get the specific worksheet by ID (GID from your URL: 1637099687)
    // If not found by ID, default to the first worksheet
    const targetGid = '1637099687';
    const sheet = doc.sheetsById[targetGid] || doc.sheetsByIndex[0];

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

    // NEW LOGIC: Try to find an empty existing row to reuse (search first 100 rows)
    const rows = await sheet.getRows({ offset: 0, limit: 100 });
    let rowToUpdate = null;

    for (const row of rows) {
      // If we find a row where Wallet Address is empty or missing, we reuse it
      if (!row.get('Wallet Address') || row.get('Wallet Address').toString().trim() === '') {
        rowToUpdate = row;
        break;
      }
    }

    const rowData = {
      'Timestamp': new Date().toISOString(),
      'Wallet Address': walletAddress,
      'Twitter Handle': twitterHandle,
      'Telegram Username': telegramUsername,
      'Email': email,
      'How Heard': howHeard || 'N/A',
    };

    if (rowToUpdate) {
      // Reuse the found empty row
      rowToUpdate.assign(rowData);
      await rowToUpdate.save();
      console.log(`Successfully reused empty row at index ${rowToUpdate.rowNumber} for wallet: ${walletAddress}`);
    } else {
      // Append a new row if no empty ones were found
      await sheet.addRow(rowData);
      console.log(`Successfully added a new entry at the end for wallet: ${walletAddress}`);
    }

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
