import { dbConnection } from '../dbconnection';
import User from '../Model/user.model';
import { getSession } from 'next-auth/react'; // Example using next-auth for authentication

export async function GET(req) {
  await dbConnection();

  const session = await getSession({ req });
  console.log ("session",session)
  if (!session) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  try {
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ companyName: user.companyName, folders: user.folders }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching company data', error }), { status: 500 });
  }
}