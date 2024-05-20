import supabase from "./utils.js";

export const getInfluencers = async () => {
  try {
    const { data, error } = await supabase
      .from("influencers")
      .select("id, name, youtubeChannel");

    console.log("data: ", data);
    return { props: { influencers: data }};
  } catch (error) {
    console.log("error: ", error.message);
  }
}

export default async function Home() {
  const data = await getInfluencers();
  const influencers = data && data.props && data.props.influencers ? data.props.influencers : undefined;
  
  return (
    <main className="container text-center">
      <div className="row">
        <h1>Crypto Patreon</h1>
        <p>Tip your favorite influencer!</p>
        {influencers && influencers.length && influencers.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Youtube channel</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {influencers.map(influencer => (
                <tr key={influencer.id}>
                  <td>{influencer.name}</td>
                  <td>{influencer.youtubeChannel}</td>
                  <td><a href={`/influencers/${influencer.id}`}>Link</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </main>
  );
}