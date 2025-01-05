import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// route pour la création d'une entreprise
export async function POST(request: Request) {
  
  try {
    // extraire les données du corps de la requête
  const {email, companyName} = await request.json();

  // vérification des champs requis
  if (!email || !companyName) {
    return NextResponse.json(
      { message: "Email et nom de l'entreprise sont obligatoires" },
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
      { message: "L'utilisateur n'existe pas" },
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
      { message: "Cette entreprise existe déjà" },
      { status: 409 }
    );
  }

  // Création de l'entreprise
  const newCompany = await prisma.company.create({
    data: {
      name: companyName,
      createdBy: {connect: {id: user.id}},
      employees: {connect: {id: user.id}}

    }
  });

  return NextResponse.json(
    { message: "Entreprise créée avec succès", company: newCompany },
    { status: 201 }
  );

  } catch (error) {
    console.error("Erreur lors de la création d'une entreprise", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}