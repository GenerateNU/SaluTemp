import { Medication } from '../types';

export async function GetMedications(): Promise<Medication[]> {
  // TODO: replace with actual api request
  const medications: Medication[] = [
    { name: 'temp', status: 'Good' },
    { name: 'temp', status: 'Warning' },
    { name: 'temp', status: 'Bad' },
    { name: 'temp', status: 'Good' },
    { name: 'temp', status: 'Good' },
    { name: 'temp', status: 'Bad' },
    { name: 'temp', status: 'Warning' },
    { name: 'temp', status: 'Good' },
    { name: 'temp', status: 'Warning' },
    { name: 'temp', status: 'Bad' },
    { name: 'temp', status: 'Good' },
    { name: 'temp', status: 'Good' },
    { name: 'temp', status: 'Bad' },
    { name: 'temp', status: 'Warning' },
    { name: 'temp', status: 'Good' },
    { name: 'temp', status: 'Warning' },
    { name: 'temp', status: 'Bad' },
    { name: 'temp', status: 'Good' },
    { name: 'temp', status: 'Good' },
    { name: 'temp', status: 'Bad' },
    { name: 'temp', status: 'Warning' }
  ];

  return medications;
}
