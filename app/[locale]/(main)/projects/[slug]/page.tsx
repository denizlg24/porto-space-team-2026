import { notFound } from "next/navigation";
import { IntlayerServerProvider } from "next-intlayer/server";
import { getIntlayer, getMultilingualUrls } from "intlayer";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/components/locale/link";
import { Separator } from "@/components/ui/separator";
import { getProjectBySlug } from "@/lib/actions/projects";
import { ProjectHero } from "./_components/project-hero";
import { ProjectStats } from "./_components/project-stats";
import { DepartmentsSection } from "./_components/departments-section";
import { ProjectMediaCarousel } from "./_components/project-media-carousel";
import { connectDB } from "@/lib/db";
import { Projects } from "@/models/Project";
import { CustomSectionsRenderer } from "./_components/custom-sections-renderer";

export const revalidate = 604800;

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  await connectDB();
  const projects = await Projects.find({}, { slug: 1 }).lean();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const name = locale === "pt" ? project.name.pt : project.name.en;
  const description =
    locale === "pt" ? project.description.pt : project.description.en;
  const multilingualUrls = getMultilingualUrls(`/projects/${slug}`);
  const localizedUrl =
    multilingualUrls[locale as keyof typeof multilingualUrls];

  return {
    title: `${name} | Porto Space Team`,
    description,
    alternates: {
      canonical: localizedUrl,
      languages: { ...multilingualUrls, "x-default": `/projects/${slug}` },
    },
    openGraph: {
      title: `${name} | Porto Space Team`,
      description,
      url: localizedUrl,
      images: project.logo ? [{ url: project.logo }] : undefined,
    },
  };
};

export default async function ProjectPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const content = getIntlayer("project-detail-page", locale);

  return (
    <IntlayerServerProvider locale={locale}>
      <main className="flex flex-col gap-8 min-h-screen items-center px-4 md:pt-32 sm:pt-28 pt-16 pb-16">
        <div className="w-full max-w-5xl">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {content.backToProjects}
          </Link>
        </div>

        <ProjectHero project={project} locale={locale} />

        {project.stats.length > 0 && (
          <>
            <Separator className="max-w-5xl" />
            <ProjectStats
              project={project}
              locale={locale}
              label={content.stats.label}
            />
          </>
        )}

        {project.departments.length > 0 && (
          <>
            <Separator className="max-w-5xl" />
            <DepartmentsSection
              project={project}
              locale={locale}
              sectionLabel={content.departments.label}
              sectionTitle={content.departments.title}
            />
          </>
        )}

        {project.media.length > 0 && (
          <>
            <Separator className="max-w-5xl" />
            <section className="w-full max-w-5xl mx-auto py-8">
              <p className="text-xs text-primary mb-2">{content.media.label}</p>
              <h2 className="text-2xl font-bold mb-8">{content.media.title}</h2>
              <ProjectMediaCarousel media={project.media} locale={locale} />
            </section>
          </>
        )}

        {project.customSections.length > 0 && (
          <>
            <Separator className="max-w-5xl" />
            <CustomSectionsRenderer
              sections={project.customSections}
              locale={locale}
            />
          </>
        )}
      </main>
    </IntlayerServerProvider>
  );
}
