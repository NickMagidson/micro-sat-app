'use client';

import { sgp4FromTle } from "@/components/sgp4";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sampleTles } from "@/lib/sampleData";
import { useRef } from "react";
import { Button } from "./ui/button";

interface TLEInputProps {
  setTleLines: (lines: string[]) => void;
  // tleLines: string[];
  setSgp4Result: (result: any) => void;
}



export default function TLEInput({ setTleLines, setSgp4Result }: TLEInputProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleTleInput() {
    const tleInput = textareaRef.current?.value || '';
    const [line0, line1, line2] = tleInput.split('\n');

    // Process the TLE lines as needed
    setTleLines([line0, line1, line2]);

  
    const result = sgp4FromTle({ line1, line2 });
    setSgp4Result(result);
    console.log('SGP4 Result:', result);
  }


  const handleRandomTle = () => {
    const randomTle = sampleTles[Math.floor(Math.random() * sampleTles.length)];
    if (textareaRef.current) {
      textareaRef.current.value = randomTle;
    }
  }

  const handleClearTle = () => {
    if (textareaRef.current) {
      textareaRef.current.value = '';
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


                  <div className="flex space-x-4">
                    <a onClick={handleRandomTle} className="text-blue-500 hover:underline text-xs cursor-pointer">
                      Random TLE
                    </a>
                    <a onClick={handleClearTle} className="text-blue-500 hover:underline text-xs cursor-pointer">
                      Clear
                    </a>
                  </div>


                </div>
                <Textarea ref={textareaRef} placeholder="Paste TLE here..." id="message" />
                <Button onClick={handleTleInput}>Propagate</Button>
              </div>
            </CardContent>
          </Card>
      </>
  );
}