import { Button } from "@/components/ui/button";


async function getPosition() {
  //Mimic server-side stuff...
  return {
    position: {
      lat: 39.953436,
      lng: -75.164356
    }
  }
}

export default async function MainPage() {
  const fetchedPosition = await getPosition();
  return (
    <>
        <div className="p-4 text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">🎉 Tailwind CSS is installed!</h1>
          <p className="text-muted-foreground mb-4">Ready for Shad/cn components</p>
          <Button>Primary Button</Button>
        </div>

        {/* <CesiumWrapper positions={[fetchedPosition.position]} /> */}
    </>
  )
}