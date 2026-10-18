import React from 'react';
import SponsorApplicationsClient from './SponsorApplicationsClient';
import { getPartnershipRequests } from './actions';

export const metadata = {
  title: 'Sponsorluk Başvuruları | Admin',
};

export default async function SponsorApplicationsPage() {
  const applications = await getPartnershipRequests();
  
  return <SponsorApplicationsClient applications={applications} />;
}
