import { Medication, Status } from '../types';

export async function GetMedications(): Promise<Medication[]> {
  // TODO: replace with actual api request
  const medications: Medication[] = [
    { name: 'temp', status: Status.Good },
    { name: 'temp', status: Status.Warning },
    { name: 'temp', status: Status.Bad },
    { name: 'temp', status: Status.Good },
    { name: 'temp', status: Status.Good },
    { name: 'temp', status: Status.Bad },
    { name: 'temp', status: Status.Warning },
    { name: 'temp', status: Status.Good },
    { name: 'temp', status: Status.Warning },
    { name: 'temp', status: Status.Bad },
    { name: 'temp', status: Status.Good },
    { name: 'temp', status: Status.Good },
    { name: 'temp', status: Status.Bad },
    { name: 'temp', status: Status.Warning },
    { name: 'temp', status: Status.Good },
    { name: 'temp', status: Status.Warning },
    { name: 'temp', status: Status.Bad },
    { name: 'temp', status: Status.Good },
    { name: 'temp', status: Status.Good },
    { name: 'temp', status: Status.Bad },
    { name: 'temp', status: Status.Warning }
  ];

  return medications;
}
