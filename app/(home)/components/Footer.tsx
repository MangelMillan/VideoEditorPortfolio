import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className=" border-t mt-10 ">
      {" "}
      <Link href="mailto:mangelmillanmtz@gmail.com">
        <h1 className="text-4xl font-bold underline underline-offset-8 decoration-yellow-300 -rotate-2 text-center justify-between pt-10 py-5 ">
          Contact Me 📬
        </h1>
      </Link>
      <p className=" font-thin  text-center justify-between py-5">
        &copy; Maikī Millán, 2024
      </p>
    </div>
  );
}
