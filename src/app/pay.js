import { ethers } from "ethers";

export default async function payment(influencer) {
    console.log('paying...');

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const transactionRequest = {
      to: influencer.wallet,
      value: ethers.parseEther("0.001")
    };

    const receipt = await signer.sendTransaction(transactionRequest);
    console.log('receipt: ', receipt);
}