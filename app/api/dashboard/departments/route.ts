import { NextResponse } from "next/server";

type DepartmentProps = {
  name: string;
};

export async function GET() {
  const departments: Array<DepartmentProps> = [
    { name: "Data Science" },
    { name: "Forensics" },
    { name: "AI Analysis" },
  ];

  return NextResponse.json(departments);
}
