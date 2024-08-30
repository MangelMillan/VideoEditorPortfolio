import React from "react";
import { TextGenerateEffect } from "@/components/ui/textgenerate";

const phrase = `"In editing, you make the film for the second time, and that's where the real creation lies." `;
const author = `-Jean-Luc Godard, French filmmaker`;

export default function Phrase() {
  return (
    <div className="mx-10 justify-between text-center mt-2">
      <TextGenerateEffect
        className="glowing-text italic font-bold  hover:not-italic"
        words={phrase}
      />
      <TextGenerateEffect
        className="font-normal hover:font-bold transition-all duration-300 ease-in-out"
        words={author}
      />
    </div>
  );
}
