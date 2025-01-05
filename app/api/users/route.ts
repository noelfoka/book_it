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

    //vérification si l'utilisateur existe déjà dans la base de données
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
      // mise à jour des données de l'utilisateur

      if (user.famillyName == null || user.givenName == null) {
        user = await prisma.user.update({
          where: {
            email,
          },
          data: {
            famillyName: user.famillyName ?? famillyName,
            givenName: user.givenName ?? givenName,
          }
        });
      }
    }

    // vérification si l'utilisateur est déjà rattaché à une entreprise
    const company = await prisma.company.findFirst({
      where: {
        employees: {
          some: {
            id: user.id,
          }
        }
      }
    })

    // si l'utilisateur est rattaché à une entreprise, on renvoie son id
    if (company) {
      return NextResponse.json({companyId: company.id});
    } else {
      return NextResponse.json({message: "Nope"});
    }

  } catch (error) {
    console.error("Erreur lors de la création d'un utilisateur", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
