import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// route pour la création d'une entreprise
export async function POST(request: Request) {
  // extraire les données du corps de la requête
  const {email, companyName} = await request.json();

  // vérification des champs requis
  if (!email || !companyName) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
}