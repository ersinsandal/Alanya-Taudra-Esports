import SchoolRepresentativePage from "./rep-client";
import { prisma } from "@/lib/db";

export const metadata = {
  title: "Okul Temsilcisi Ol | ATE Digital Arena",
  description: "Okulunun espor elçisi ol ve takımını yönet.",
};

export default async function RepresentativePage() {
  const schools = await prisma.school.findMany({
    orderBy: { name: 'asc' }
  });

  const schoolList = schools.map(s => s.name);

  return <SchoolRepresentativePage schools={schoolList} />;
}
