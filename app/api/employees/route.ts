// Api pour récupérer les employés d'une entreprise
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// route pour la création d'un employé
export async function GET(request: Request) {
  try {

    // récupération des paramètres de la requête
    const { searchParams } = new URL(request.url);

    // extraction des paramètres de la requête
    const companyId = searchParams.get("companyId");

    // Vérifier si l'id de l'entreprise est fourni
    if (!companyId) {
      return NextResponse.json(
        { message: "l'id de l'entreprise est requis" },
        { status: 400 }
      );
    }

    // Récupération des employés de l'entreprise
    const employees = await prisma.user.findMany({
      where: {
        CompanyId: companyId
      },
      select: {
        id: true,
        email: true,
        givenName: true,
        famillyName: true
      }
    })

    // récuperer le nom de l'entreprise
    const company = await prisma.company.findUnique({
      where: {
        id: companyId
      },
      select: {
        name: true
      }
    })

    const formattedEmployees = employees.map((employee) => ({
      id: employee.id,
      email: employee.email,
      givenName: employee.givenName,
      famillyName: employee.famillyName
    }))
    
  } catch (error) {
    console.error("Error getting companies", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}