import { Medication } from '../types';

export async function GetMedications(): Promise<Medication[]> {
  const medications: Medication[] = [
    { name: 'temp', status: 'status check' },
    { name: 'temp2', status: 'status check' }
  ];

  return medications;
}
