import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className=" border-t mt-10">
      {" "}
      <Link href="mailto:mangelmillanmtz@gmail.com">
        <h1 className="text-4xl font-bold underline underline-offset-8 decoration-red-300 -rotate-1 text-center justify-between py-10 pt-20">
          Contact Me 📬
        </h1>
      </Link>
      <p className=" font-thin  text-center justify-between">
        &copy; Maikī Millán, 2024
      </p>
    </div>
  );
}
