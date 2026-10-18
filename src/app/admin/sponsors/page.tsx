import React from 'react';
import SponsorsClient from './SponsorsClient';
import { getSponsors } from './actions';

export const metadata = {
  title: 'Sponsor Yönetimi | Admin',
};

export default async function SponsorsAdminPage() {
  const sponsors = await getSponsors();
  
  return <SponsorsClient sponsors={sponsors} />;
}
