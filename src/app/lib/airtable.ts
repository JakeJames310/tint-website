import Airtable from 'airtable';

// Initialize Airtable only if credentials are available
const base = process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID
  ? new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY,
    }).base(process.env.AIRTABLE_BASE_ID)
  : null;

const table = base ? base(process.env.AIRTABLE_TABLE_NAME || 'Customers') : null;

export interface CustomerData {
  email: string;
  name: string;
  googleId: string;
  profilePicture: string;
}

export interface CustomerRecord extends CustomerData {
  id: string;
  createdAt: string;
  lastLoginAt: string;
  loginCount: number;
  subscriptionStatus: 'free' | 'trial' | 'premium';
}

export async function createOrUpdateCustomer(data: CustomerData): Promise<CustomerRecord> {
  // Return mock data if Airtable is not configured (build time)
  if (!table) {
    console.warn('Airtable not configured - returning mock customer record');
    return {
      id: 'mock-id',
      email: data.email,
      name: data.name,
      googleId: data.googleId,
      profilePicture: data.profilePicture,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      loginCount: 1,
      subscriptionStatus: 'free',
    };
  }

  try {
    // First, try to find existing customer by googleId
    const existingRecords = await table
      .select({
        filterByFormula: `{googleId} = '${data.googleId}'`,
        maxRecords: 1,
      })
      .firstPage();

    if (existingRecords.length > 0) {
      // Update existing customer
      const record = existingRecords[0];
      const currentLoginCount = record.get('loginCount') as number || 0;
      
      const updatedRecord = await table.update(record.id, {
        lastLoginAt: new Date().toISOString(),
        loginCount: currentLoginCount + 1,
        // Update other fields in case they changed
        name: data.name,
        profilePicture: data.profilePicture,
      });

      return {
        id: updatedRecord.id,
        email: updatedRecord.get('email') as string,
        name: updatedRecord.get('name') as string,
        googleId: updatedRecord.get('googleId') as string,
        profilePicture: updatedRecord.get('profilePicture') as string,
        createdAt: updatedRecord.get('createdAt') as string,
        lastLoginAt: updatedRecord.get('lastLoginAt') as string,
        loginCount: updatedRecord.get('loginCount') as number,
        subscriptionStatus: updatedRecord.get('subscriptionStatus') as 'free' | 'trial' | 'premium' || 'free',
      };
    } else {
      // Create new customer
      const newRecord = await table.create({
        email: data.email,
        name: data.name,
        googleId: data.googleId,
        profilePicture: data.profilePicture,
        lastLoginAt: new Date().toISOString(),
        loginCount: 1,
        subscriptionStatus: 'free',
      });

      return {
        id: newRecord.id,
        email: newRecord.get('email') as string,
        name: newRecord.get('name') as string,
        googleId: newRecord.get('googleId') as string,
        profilePicture: newRecord.get('profilePicture') as string,
        createdAt: newRecord.get('createdAt') as string,
        lastLoginAt: newRecord.get('lastLoginAt') as string,
        loginCount: newRecord.get('loginCount') as number,
        subscriptionStatus: newRecord.get('subscriptionStatus') as 'free' | 'trial' | 'premium' || 'free',
      };
    }
  } catch (error) {
    console.error('Airtable error:', error);
    throw new Error('Failed to create or update customer in Airtable');
  }
}

export async function getCustomerByGoogleId(googleId: string): Promise<CustomerRecord | null> {
  if (!table) {
    console.warn('Airtable not configured - returning null');
    return null;
  }

  try {
    const records = await table
      .select({
        filterByFormula: `{googleId} = '${googleId}'`,
        maxRecords: 1,
      })
      .firstPage();

    if (records.length === 0) {
      return null;
    }

    const record = records[0];
    return {
      id: record.id,
      email: record.get('email') as string,
      name: record.get('name') as string,
      googleId: record.get('googleId') as string,
      profilePicture: record.get('profilePicture') as string,
      createdAt: record.get('createdAt') as string,
      lastLoginAt: record.get('lastLoginAt') as string,
      loginCount: record.get('loginCount') as number,
      subscriptionStatus: record.get('subscriptionStatus') as 'free' | 'trial' | 'premium' || 'free',
    };
  } catch (error) {
    console.error('Airtable error:', error);
    return null;
  }
}

export async function getCustomerByEmail(email: string): Promise<CustomerRecord | null> {
  if (!table) {
    console.warn('Airtable not configured - returning null');
    return null;
  }

  try {
    const records = await table
      .select({
        filterByFormula: `{email} = '${email}'`,
        maxRecords: 1,
      })
      .firstPage();

    if (records.length === 0) {
      return null;
    }

    const record = records[0];
    return {
      id: record.id,
      email: record.get('email') as string,
      name: record.get('name') as string,
      googleId: record.get('googleId') as string,
      profilePicture: record.get('profilePicture') as string,
      createdAt: record.get('createdAt') as string,
      lastLoginAt: record.get('lastLoginAt') as string,
      loginCount: record.get('loginCount') as number,
      subscriptionStatus: record.get('subscriptionStatus') as 'free' | 'trial' | 'premium' || 'free',
    };
  } catch (error) {
    console.error('Airtable error:', error);
    return null;
  }
}