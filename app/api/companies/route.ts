import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// route pour la création d'une entreprise
export async function POST(request: Request) {
  // extraire les données du corps de la requête
  const {email, companyName} = await request.json();

  // vérification des champs requis
  if (!email || !companyName) {
    return NextResponse.json(
      { error: "Email et nom de l'entreprise sont obligatoires" },
      { status: 400 }
    );
  }

  // Vérifier si l'utilisateur existe déjà dans la base de données
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    return NextResponse.json(
      { error: "L'utilisateur n'existe pas" },
      { status: 404 }
    );
  }

  // Unicité de l'entreprise
  const existingCompany = await prisma.company.findUnique({
    where: {
      name: companyName,
    }
  });

  if (existingCompany) {
    return NextResponse.json(
      { error: "Cette entreprise existe déjà" },
      { status: 409 }
    );
  }
}