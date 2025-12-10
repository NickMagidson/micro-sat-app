import SingleTleProcessContainer from "@/app/SingleTleProcessContainer";


export default function TleProcessor() {
  const currentEpoch = new Date();
  console.log("Current Epoch:", currentEpoch.toISOString());

  return (
    <>
      <SingleTleProcessContainer currentEpoch={currentEpoch} />
    </>
  );
}
