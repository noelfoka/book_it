// api permettant d'enregistrer un utilisateur dans la base de données
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// route pour la création d'un utilisateur
export async function POST(request: Request) {
  try {
    const { email, famillyName, givenName } = await request.json();

    // vérification des champs requis
    if (!email || !famillyName || !givenName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    //vérificatio si l'utilisateur existe déjà dans la base de données
    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      // création d'un utilisateur
      user = await prisma.user.create({
        data: {
          email,
          famillyName,
          givenName,
        },
      });
    } else {
    }
  } catch (error) {
    console.error("Erreur lors de la création d'un utilisateur", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
