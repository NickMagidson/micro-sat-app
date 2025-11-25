'use client';

import { sgp4FromTle } from "@/components/sgp4";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sampleTles } from "@/lib/sampleData";
import { Button } from "./ui/button";

interface TLEInputProps {
  setTleLines: (lines: string[]) => void;
  // tleLines: string[];
  setSgp4Result: (result: any) => void;
}



export default function TLEInput({ setTleLines, setSgp4Result }: TLEInputProps) {

  function handleTleInput() {
    const textarea = document.getElementById('message') as HTMLTextAreaElement;
    const tleInput = textarea?.value || '';
    const [line0, line1, line2] = tleInput.split('\n');

    // Process the TLE lines as needed
    setTleLines([line0, line1, line2]);

    // console.log('Processing TLE lines:');
    // console.log('Line 0:', line0);
    // console.log('Line 1:', line1);
    // console.log('Line 2:', line2);
  
    const result = sgp4FromTle({ line1, line2 });
    setSgp4Result(result);
    console.log('SGP4 Result:', result);
  }


  const handleRandomTle = () => {
    const randomTle = sampleTles[Math.floor(Math.random() * sampleTles.length)];
    const textarea = document.getElementById('message') as HTMLTextAreaElement;
    if (textarea) {
      textarea.value = randomTle;
    }
  }


  return (
    <>
      <Card>
        {/* <CardHeader>
          <CardTitle>Send Message</CardTitle>
        </CardHeader> */}
            <CardContent>
              <div className="grid w-full gap-3">
                <div className="flex items-center justify-between">
                <Label className="text-lg" htmlFor="message">TLE Input</Label>
                <a onClick={handleRandomTle} className="text-blue-500 hover:underline text-xs">
                  Random TLE
                </a>
                </div>
                <Textarea placeholder="Paste TLE here..." id="message" />
                <Button onClick={handleTleInput}>Process TLE</Button>
              </div>
            </CardContent>
          </Card>
      </>
  );
}