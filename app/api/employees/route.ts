// Api pour récupérer les employés d'une entreprise
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// route pour la création d'un employé
export async function GET(request: Request) {
  try {
    
  } catch (error) {
    console.error("Error getting companies", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}