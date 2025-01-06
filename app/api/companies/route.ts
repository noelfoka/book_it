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

// route pour afficher les entreprises
export async function GET(request: Request) {
  try {

    // récupération des paramètres de la requête
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    // Vérifier si l'email est fourni
    if (!email) {
      return NextResponse.json(
        { message: "l'email est requis" },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe avec cet email
    const user = await prisma.user.findUnique({
      where: {email}
    })

    // Vérifier si l'utilisateur existe
    if(!user) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // Récupération des entreprises de l'utilisateur
    const companies = await prisma.company.findMany({
      where: {
        createdById: user.id
      }
    })

    // une fois les entreprises récupérées, on les retourne à notre front end
    return NextResponse.json(
      {companies},
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Error getting companies", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Api pour supprimer une entreprise
export async function DELETE(request: Request) {
  try {
    // Extraire l'id de l'entreprise à supprimer
    const { id } = await request.json();

    // Vérifier si l'entreprise existe
    const company = await prisma.company.findUnique({
      where: {
        id
      }
    })

    // Vérifier si l'entreprise existe
    if (!company) {
      return NextResponse.json(
        { message: "Entreprise non trouvée" },
        { status: 404 }
      );
    }

  } catch (error) {
    console.error("Error getting companies", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}