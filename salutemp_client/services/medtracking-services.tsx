import { Medication, Status } from '../types';

export async function getMedications(): Promise<Medication[]> {
  if (false) {
    try {
      const response = await fetch('http:...', {
        method: 'GET'
      });

      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw error;
    }
  }

  return [
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
}
