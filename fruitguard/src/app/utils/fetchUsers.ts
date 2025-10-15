const baseUrl = '/api/farmers';
export async function fetchUsers() {
 try {
   const response = await fetch(baseUrl);
   if (!response.ok) {
     throw new Error('Something went wrong: ' + response.statusText);
   }
   const result = await response.json();
   return result;
 } catch (error) {
   throw new Error('Failed to fetch users: ' + (error as Error).message);
 }
}

export async function addFarmers(data: {first_name: string; last_name: string; phone_number: string ;location:string;number_of_traps:string;user_type:string}) {
 try {
   const response = await fetch(baseUrl, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(data),
   });
   if (!response.ok) {
     throw new Error('Something went wrong: ' + response.statusText);
   }
   const result = await response.json();
   return result;
 } catch (error) {
   throw new Error('Failed to add farmer: ' + (error as Error).message);
 }
}


