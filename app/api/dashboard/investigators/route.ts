import { NextResponse } from "next/server";

type InvestigatorProps = {
  name: string;
};

export async function GET() {
  const investigators: InvestigatorProps[] = [
    { name: "Dr. Eleanor Matthews" },
    { name: "Dr. Sarah Connor" },
    { name: "James Wilson" },
  ];

  return NextResponse.json(investigators);
}
