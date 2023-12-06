import axios from 'axios';

import { API_URL } from './apiLinks';
import { MedicationPositionStates } from '../components/medication-overview-popup/MedOverviewPopup';

export const findMedicationName = async (medication_name: string) => {
  const response = await axios.get(`${API_URL}/v1/medications/${medication_name}`);
  return response.data;
};

export const getAllUserMedicationsWithConstraint = async (userId: string, constraint: string) => {
  const response = await axios.get(
    `${API_URL}/v1/allusermedicationswithconstraint/${userId}/${constraint}`
  );

  return response.data;
};

export const getMedicationStatus = async (medId: number) => {
  // TODO: update this with an actual api request
  const medicationStatus: MedicationPositionStates = {
    max: 46,
    min: 36,
    data: [
      { time: 36, point: 37 },
      { time: 24, point: 39 },
      { time: 18, point: 44 },
      { time: 12, point: 41 },
      { time: 6, point: 45 },
      { time: 0, point: 39 }
    ]
  };

  return medicationStatus;
};

// *********** THIS IS SAMPLE CODE TAKEN FROM REMO - WILL NEED TO EDIT TO FIT OUT SPECIFICATIONS

// export const checkoutBook = async ({ barcode, user }: BookUser) => {
//   const response = await axios.post(
//     `${API_URL}/v1/checkout_book/${barcode}/${user}`
//   );
//   console.log("checked out");
//   console.log("barcode; ", barcode, " user; ", user);
//   console.log("the response is ------");
//   console.log(response);
//   return response.data;
// };

// export const returnBook = async ({ barcode, user }: BookUser) => {
//   const response = await axios.delete(
//     `${API_URL}/v1/return/${barcode}/${user}`
//   );
//   console.log("barcode; ", barcode);
//   console.log("the response is ------");
//   console.log(response);
//   return response.data;
// };

// export const findUserBooks = async (id: string) => {
//   const response = await axios.get(`${API_URL}/v1/user_books/${id}`);
//   console.log(response.data);
//   const updatedBooks = await Promise.all(
//     response.data.map(async (bookData) => {
//       console.log(bookData);

//       const coverResponse = await findGoogleBook(bookData.isbn_13);
//       console.log("2");
//       try {
//         const obj = coverResponse.items[0].volumeInfo;
//         const imageLinks = obj.imageLinks;
//         const arr = Object.entries(imageLinks);
//         const coverImage = arr[arr.length - 1][1];
//         return { ...bookData, coverImage };
//       } catch (err) {
//         return { ...bookData, undefined };
//       }
//     })
//   );
//   console.log(updatedBooks);
//   return updatedBooks;
// };

// export const findAllBooks = async () => {
//   const response = await axios.get(`${API_URL}/v1/all_books`);

//   return response.data;
// };

// export const onboardUser = async (user_id: string) => {
//   const response = await axios.put(`${API_URL}/v1/onboard/${user_id}`);
//   console.log(response.data);
//   return response.data;
// };

// export const checkOnboarded = async (user_id: string) => {
//   const response = await axios.get(`${API_URL}/v1/check_onboarded/${user_id}`);
//   console.log(response.data);
//   return response.data;
// };

// export const ree = async (user_id: string) => {
//   const response = await axios.get(
//     `${API_URL}/v1/user_reading_logs/${user_id}`
//   );
//   return response.data;
// };

// export const logReadingLog = async (postInfo: JSON) => {
//   console.log(postInfo);
//   const response = await axios.post(`${API_URL}/v1/add_reading_log`, postInfo);
//   return response.data;
// };
