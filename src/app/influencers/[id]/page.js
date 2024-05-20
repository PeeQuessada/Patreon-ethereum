"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import payment from "../../pay";

export default function Influencer() {
  const [influencer, setInfluencer] = useState(undefined);
  const params = useParams();
  
  useEffect(() => {
    const init = async () => {
      try {
        const response = await fetch(
          `/influencers/${params.id}/api`,
          {
            method: "GET",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            }
          }
        );
        const res = await response.json();
        console.log('res ', res);
        setInfluencer(res);
        if(response.ok) {
          // setFeedback({status: "success", message: res.message});
        }
        else {
          // setFeedback({status: "danger", message: res.message});
        }

      } catch (error) {
        console.log('error: ', error);
        // setFeedback({status: "danger", message: error.message});
      }
    };
    init();
  }, [params.id]);

  const handlePay = async (e) => {
    e.preventDefault();
    await payment(influencer);
  }

  return (
    <main className="container text-center">
      <div className="row">
        <div className="main-col col d-flex flex-column justify-content-center">
          <h1>Crypto Patreon</h1>
          <p>Tip your favourite influencer!</p>
          {influencer ? (
            <ul className="list-group">
              <li className="list-group-item">Name: {influencer.name}</li>
              <li className="list-group-item">Description: {influencer.description}</li>
              <li className="list-group-item">Youtube Channel: {influencer.youtubeChannel}</li>
              <li className="list-group-item">Wallet: {influencer.wallet}</li>
              <li className="list-group-item">
                <button type="submit" onClick={(e) => handlePay(e)} className="btn btn-secondary">Pay</button>
              </li>
            </ul>
          ) : null}
        </div>
      </div>
    </main>
  )
}