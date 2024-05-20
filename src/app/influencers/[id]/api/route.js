import Influencer from "../page";
import supabase from "../../../utils.js";

export async function GET(request) {
  const url = request.url.split("/");
  const id = url[4];
  console.log('id: ', id);

  try {
    const { data, error } = await supabase
      .from("influencers")
      .select("id, name, description, youtubeChannel, wallet")
      .eq("id", id);

    if(!data || data.length == 0) {
      throw new Error('Not found');
    }

    const influencer = data[0];

    return Response.json(influencer);
  } catch (error) {
    console.log('error: ', error.message);
    const notFound = error.message == "Not found";
    const errorMessage = notFound ? error.message : "We had a problem with database, please try again";
    const statusCode = notFound ? "404" : "500";

    return Response.json({message: errorMessage},{status: statusCode});
  }
}