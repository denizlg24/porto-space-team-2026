"use client";

import { useState, useTransition, useRef, useMemo, useCallback } from "react";
import { useIntlayer } from "next-intlayer";
import { toast } from "sonner";
import {
  Plus,
  Trash2,
  Loader2,
  Upload,
  X,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  updateProjectContent,
  type ProjectData,
  type ProjectDepartmentData,
  type ProjectMediaData,
} from "@/lib/actions/projects";
import type { StatItem, MediaType } from "@/models/Project";
import { apiClient } from "@/lib/api-client";
import type { FileUploadRoute } from "@/app/api/files/route";

const filesApi = apiClient<FileUploadRoute>("/api/files");

type Props = {
  project: ProjectData;
};

function generateId(prefix: string = "item"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function ProjectContentEditor({ project }: Props) {
  const content = useIntlayer("admin-project-content-page");
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingDeptId, setUploadingDeptId] = useState<string | null>(null);

  const [heroDescriptionEn, setHeroDescriptionEn] = useState(
    project.heroDescription.en
  );
  const [heroDescriptionPt, setHeroDescriptionPt] = useState(
    project.heroDescription.pt
  );

  const [stats, setStats] = useState<StatItem[]>(project.stats);

  const [projectImage, setProjectImage] = useState(project.projectImage);
  const [projectImageAltEn, setProjectImageAltEn] = useState(
    project.projectImageAlt.en
  );
  const [projectImageAltPt, setProjectImageAltPt] = useState(
    project.projectImageAlt.pt
  );

  const [departments, setDepartments] = useState<ProjectDepartmentData[]>(
    project.departments
  );

  const [media, setMedia] = useState<ProjectMediaData[]>(project.media);
  const [uploadingMediaId, setUploadingMediaId] = useState<string | null>(null);

  const [savedState, setSavedState] = useState(() => ({
    heroDescriptionEn: project.heroDescription.en,
    heroDescriptionPt: project.heroDescription.pt,
    stats: project.stats,
    projectImage: project.projectImage,
    projectImageAltEn: project.projectImageAlt.en,
    projectImageAltPt: project.projectImageAlt.pt,
    departments: project.departments,
    media: project.media,
  }));

  const hasChanges = useMemo(() => {
    if (heroDescriptionEn !== savedState.heroDescriptionEn) return true;
    if (heroDescriptionPt !== savedState.heroDescriptionPt) return true;
    if (projectImage !== savedState.projectImage) return true;
    if (projectImageAltEn !== savedState.projectImageAltEn) return true;
    if (projectImageAltPt !== savedState.projectImageAltPt) return true;
    if (JSON.stringify(stats) !== JSON.stringify(savedState.stats)) return true;
    if (JSON.stringify(departments) !== JSON.stringify(savedState.departments)) return true;
    if (JSON.stringify(media) !== JSON.stringify(savedState.media)) return true;
    return false;
  }, [
    heroDescriptionEn,
    heroDescriptionPt,
    stats,
    projectImage,
    projectImageAltEn,
    projectImageAltPt,
    departments,
    media,
    savedState,
  ]);

  const handleSave = useCallback(() => {
    startTransition(async () => {
      const currentDepartments = departments.map((d, i) => ({ ...d, order: i }));
      const currentMedia = media.map((m, i) => ({ ...m, order: i }));
      
      const result = await updateProjectContent(project.id, {
        heroDescription: { en: heroDescriptionEn, pt: heroDescriptionPt },
        stats,
        projectImage,
        projectImageAlt: { en: projectImageAltEn, pt: projectImageAltPt },
        departments: currentDepartments,
        media: currentMedia,
      });

      if (result.success) {
        setSavedState({
          heroDescriptionEn,
          heroDescriptionPt,
          stats,
          projectImage,
          projectImageAltEn,
          projectImageAltPt,
          departments: currentDepartments,
          media: currentMedia,
        });
        toast.success(content.toast.saveSuccess.value);
      } else {
        toast.error(content.toast.saveError.value);
      }
    });
  }, [
    project.id,
    heroDescriptionEn,
    heroDescriptionPt,
    stats,
    projectImage,
    projectImageAltEn,
    projectImageAltPt,
    departments,
    media,
    content.toast.saveSuccess.value,
    content.toast.saveError.value,
  ]);

  const handleProjectImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    const file = files[0];
    if (!file.type.startsWith("image/")) return;

    setIsUploading(true);

    startTransition(async () => {
      const formData = new FormData();
      formData.append("file", file);
      const result = await filesApi.post({ input: formData });

      if (result.success) {
        setProjectImage(result.data.url);
      } else {
        toast.error(content.toast.saveError.value);
      }

      setIsUploading(false);
    });
  };

  const addStat = () => {
    setStats((prev) => [
      ...prev,
      { value: "", label: { en: "", pt: "" } },
    ]);
  };

  const updateStat = (
    index: number,
    field: "value" | "labelEn" | "labelPt",
    value: string
  ) => {
    setStats((prev) =>
      prev.map((stat, i) => {
        if (i !== index) return stat;
        if (field === "value") return { ...stat, value };
        if (field === "labelEn")
          return { ...stat, label: { ...stat.label, en: value } };
        if (field === "labelPt")
          return { ...stat, label: { ...stat.label, pt: value } };
        return stat;
      })
    );
  };

  const removeStat = (index: number) => {
    setStats((prev) => prev.filter((_, i) => i !== index));
  };

  const addDepartment = () => {
    setDepartments((prev) => [
      ...prev,
      {
        id: generateId(),
        title: { en: "", pt: "" },
        description: { en: "", pt: "" },
        bulletPoints: [],
        gallery: [],
        order: prev.length,
      },
    ]);
  };

  const updateDepartment = <K extends keyof ProjectDepartmentData>(
    deptId: string,
    field: K,
    value: ProjectDepartmentData[K]
  ) => {
    setDepartments((prev) =>
      prev.map((d) => (d.id === deptId ? { ...d, [field]: value } : d))
    );
  };

  const removeDepartment = (deptId: string) => {
    setDepartments((prev) => prev.filter((d) => d.id !== deptId));
  };

  const moveDepartment = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === departments.length - 1)
    )
      return;

    const newDepartments = [...departments];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    [newDepartments[index], newDepartments[newIndex]] = [
      newDepartments[newIndex],
      newDepartments[index],
    ];
    setDepartments(newDepartments);
  };

  const addBulletPoint = (deptId: string) => {
    setDepartments((prev) =>
      prev.map((d) =>
        d.id === deptId
          ? { ...d, bulletPoints: [...d.bulletPoints, { en: "", pt: "" }] }
          : d
      )
    );
  };

  const updateBulletPoint = (
    deptId: string,
    bpIndex: number,
    lang: "en" | "pt",
    value: string
  ) => {
    setDepartments((prev) =>
      prev.map((d) =>
        d.id === deptId
          ? {
              ...d,
              bulletPoints: d.bulletPoints.map((bp, i) =>
                i === bpIndex ? { ...bp, [lang]: value } : bp
              ),
            }
          : d
      )
    );
  };

  const removeBulletPoint = (deptId: string, bpIndex: number) => {
    setDepartments((prev) =>
      prev.map((d) =>
        d.id === deptId
          ? {
              ...d,
              bulletPoints: d.bulletPoints.filter((_, i) => i !== bpIndex),
            }
          : d
      )
    );
  };

  const handleGalleryUpload = (
    deptId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    e.target.value = "";

    const validFiles = Array.from(files).filter((f) =>
      f.type.startsWith("image/")
    );
    if (validFiles.length === 0) return;

    setUploadingDeptId(deptId);

    startTransition(async () => {
      const uploadPromises = validFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        const result = await filesApi.post({ input: formData });
        return result.success ? result.data.url : null;
      });

      const urls = (await Promise.all(uploadPromises)).filter(
        (url): url is string => url !== null
      );

      if (urls.length > 0) {
        setDepartments((prev) =>
          prev.map((d) =>
            d.id === deptId
              ? {
                  ...d,
                  gallery: [
                    ...d.gallery,
                    ...urls.map((url) => ({ url, alt: { en: "", pt: "" } })),
                  ],
                }
              : d
          )
        );
      }

      setUploadingDeptId(null);
    });
  };

  const removeGalleryImage = (deptId: string, imgIndex: number) => {
    setDepartments((prev) =>
      prev.map((d) =>
        d.id === deptId
          ? { ...d, gallery: d.gallery.filter((_, i) => i !== imgIndex) }
          : d
      )
    );
  };

  const handleMediaUpload = (
    type: MediaType,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    e.target.value = "";

    const validFiles = Array.from(files).filter((f) =>
      type === "image" ? f.type.startsWith("image/") : f.type.startsWith("video/")
    );
    if (validFiles.length === 0) return;

    const tempId = generateId("media");
    setUploadingMediaId(tempId);

    startTransition(async () => {
      const uploadPromises = validFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        const result = await filesApi.post({ input: formData });
        return result.success ? result.data.url : null;
      });

      const urls = (await Promise.all(uploadPromises)).filter(
        (url): url is string => url !== null
      );

      if (urls.length > 0) {
        setMedia((prev) => [
          ...prev,
          ...urls.map((url, idx) => ({
            id: generateId("media"),
            type,
            url,
            alt: { en: "", pt: "" },
            tags: [],
            order: prev.length + idx,
          })),
        ]);
      }

      setUploadingMediaId(null);
    });
  };

  const updateMedia = <K extends keyof ProjectMediaData>(
    mediaId: string,
    field: K,
    value: ProjectMediaData[K]
  ) => {
    setMedia((prev) =>
      prev.map((m) => (m.id === mediaId ? { ...m, [field]: value } : m))
    );
  };

  const removeMedia = (mediaId: string) => {
    setMedia((prev) => prev.filter((m) => m.id !== mediaId));
  };

  const moveMedia = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === media.length - 1)
    )
      return;

    const newMedia = [...media];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    [newMedia[index], newMedia[newIndex]] = [newMedia[newIndex], newMedia[index]];
    setMedia(newMedia);
  };

  const addMediaTag = (mediaId: string) => {
    setMedia((prev) =>
      prev.map((m) =>
        m.id === mediaId
          ? { ...m, tags: [...m.tags, { en: "", pt: "" }] }
          : m
      )
    );
  };

  const updateMediaTag = (
    mediaId: string,
    tagIndex: number,
    lang: "en" | "pt",
    value: string
  ) => {
    setMedia((prev) =>
      prev.map((m) =>
        m.id === mediaId
          ? {
              ...m,
              tags: m.tags.map((tag, i) =>
                i === tagIndex ? { ...tag, [lang]: value } : tag
              ),
            }
          : m
      )
    );
  };

  const removeMediaTag = (mediaId: string, tagIndex: number) => {
    setMedia((prev) =>
      prev.map((m) =>
        m.id === mediaId
          ? { ...m, tags: m.tags.filter((_, i) => i !== tagIndex) }
          : m
      )
    );
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="hero">{content.tabs.hero}</TabsTrigger>
          <TabsTrigger value="stats">{content.tabs.stats}</TabsTrigger>
          <TabsTrigger value="image">{content.tabs.image}</TabsTrigger>
          <TabsTrigger value="media">{content.tabs.media}</TabsTrigger>
          <TabsTrigger value="departments">{content.tabs.departments}</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-4 mt-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">{content.hero.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {content.hero.description}
            </p>
          </div>
          <Tabs defaultValue="en" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="en">
                {content.form.languages.english}
              </TabsTrigger>
              <TabsTrigger value="pt">
                {content.form.languages.portuguese}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="en">
              <Textarea
                value={heroDescriptionEn}
                onChange={(e) => setHeroDescriptionEn(e.target.value)}
                placeholder={content.hero.placeholderEn.value}
                rows={6}
              />
            </TabsContent>
            <TabsContent value="pt">
              <Textarea
                value={heroDescriptionPt}
                onChange={(e) => setHeroDescriptionPt(e.target.value)}
                placeholder={content.hero.placeholderPt.value}
                rows={6}
              />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4 mt-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">{content.stats.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {content.stats.description}
            </p>
          </div>

          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-1 space-y-4">
                    <div>
                      <Label>{content.stats.value}</Label>
                      <Input
                        value={stat.value}
                        onChange={(e) =>
                          updateStat(index, "value", e.target.value)
                        }
                        placeholder={content.stats.valuePlaceholder.value}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>
                          {content.stats.label} ({content.form.languages.english})
                        </Label>
                        <Input
                          value={stat.label.en}
                          onChange={(e) =>
                            updateStat(index, "labelEn", e.target.value)
                          }
                          placeholder={content.stats.labelPlaceholderEn.value}
                        />
                      </div>
                      <div>
                        <Label>
                          {content.stats.label} ({content.form.languages.portuguese})
                        </Label>
                        <Input
                          value={stat.label.pt}
                          onChange={(e) =>
                            updateStat(index, "labelPt", e.target.value)
                          }
                          placeholder={content.stats.labelPlaceholderPt.value}
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeStat(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button variant="outline" onClick={addStat}>
            <Plus className="h-4 w-4 mr-2" />
            {content.stats.addStat}
          </Button>
        </TabsContent>

        <TabsContent value="image" className="space-y-4 mt-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {content.projectImage.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {content.projectImage.description}
            </p>
          </div>

          <div className="space-y-4">
            {projectImage ? (
              <div className="relative inline-block">
                <div className="relative h-64 w-48 overflow-hidden border bg-muted">
                  <Image
                    src={projectImage}
                    alt="Project"
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6"
                  onClick={() => setProjectImage("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProjectImageUpload}
                  className="hidden"
                  id="project-image-upload"
                />
                <Button variant="outline" disabled={isUploading} asChild>
                  <label
                    htmlFor="project-image-upload"
                    className="cursor-pointer"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {content.form.uploading}
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        {content.projectImage.upload}
                      </>
                    )}
                  </label>
                </Button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>
                  {content.projectImage.altLabel} ({content.form.languages.english})
                </Label>
                <Input
                  value={projectImageAltEn}
                  onChange={(e) => setProjectImageAltEn(e.target.value)}
                  placeholder={content.projectImage.altPlaceholderEn.value}
                />
              </div>
              <div>
                <Label>
                  {content.projectImage.altLabel} ({content.form.languages.portuguese})
                </Label>
                <Input
                  value={projectImageAltPt}
                  onChange={(e) => setProjectImageAltPt(e.target.value)}
                  placeholder={content.projectImage.altPlaceholderPt.value}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-4 mt-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {content.media.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {content.media.description}
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {media.map((item, index) => (
              <AccordionItem key={item.id} value={item.id} className="border rounded-lg">
                <div className="flex items-center px-4">
                  <div className="flex flex-col gap-1 py-2">
                    <button
                      type="button"
                      className="h-5 w-5 inline-flex items-center justify-center rounded-md hover:bg-accent disabled:opacity-50"
                      onClick={() => moveMedia(index, "up")}
                      disabled={index === 0}
                    >
                      <ChevronUp className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      className="h-5 w-5 inline-flex items-center justify-center rounded-md hover:bg-accent disabled:opacity-50"
                      onClick={() => moveMedia(index, "down")}
                      disabled={index === media.length - 1}
                    >
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </div>
                  <AccordionTrigger className="flex-1 px-2 hover:no-underline">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-muted">
                        {item.type === "image"
                          ? content.media.typeImage
                          : content.media.typeVideo}
                      </span>
                      <span className="font-medium truncate max-w-50">
                        {item.alt.en || item.alt.pt || `Media ${index + 1}`}
                      </span>
                    </div>
                  </AccordionTrigger>
                </div>
                <AccordionContent className="px-4 pb-4 space-y-4 overflow-y-auto">
                  <div className="flex gap-4">
                    {item.type === "image" ? (
                      <div className="relative h-32 w-48 overflow-hidden border bg-muted shrink-0">
                        <Image
                          src={item.url}
                          alt={item.alt.en || `Media ${index + 1}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="relative h-32 w-48 overflow-hidden border bg-muted shrink-0">
                        <video
                          src={item.url}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 space-y-4">
                      <Tabs defaultValue="en" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="en">
                            {content.form.languages.english}
                          </TabsTrigger>
                          <TabsTrigger value="pt">
                            {content.form.languages.portuguese}
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="en" className="space-y-4">
                          <div>
                            <Label>{content.media.altLabel}</Label>
                            <Input
                              value={item.alt.en}
                              onChange={(e) =>
                                updateMedia(item.id, "alt", {
                                  ...item.alt,
                                  en: e.target.value,
                                })
                              }
                              placeholder={content.media.altPlaceholderEn.value}
                            />
                          </div>
                          <div>
                            <Label>{content.media.tags}</Label>
                            {item.tags.map((tag, tagIndex) => (
                              <div key={tagIndex} className="flex gap-2 mt-2">
                                <Input
                                  value={tag.en}
                                  onChange={(e) =>
                                    updateMediaTag(
                                      item.id,
                                      tagIndex,
                                      "en",
                                      e.target.value
                                    )
                                  }
                                  placeholder={content.media.tagPlaceholderEn.value}
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeMediaTag(item.id, tagIndex)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => addMediaTag(item.id)}
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              {content.media.addTag}
                            </Button>
                          </div>
                        </TabsContent>
                        <TabsContent value="pt" className="space-y-4">
                          <div>
                            <Label>{content.media.altLabel}</Label>
                            <Input
                              value={item.alt.pt}
                              onChange={(e) =>
                                updateMedia(item.id, "alt", {
                                  ...item.alt,
                                  pt: e.target.value,
                                })
                              }
                              placeholder={content.media.altPlaceholderPt.value}
                            />
                          </div>
                          <div>
                            <Label>{content.media.tags}</Label>
                            {item.tags.map((tag, tagIndex) => (
                              <div key={tagIndex} className="flex gap-2 mt-2">
                                <Input
                                  value={tag.pt}
                                  onChange={(e) =>
                                    updateMediaTag(
                                      item.id,
                                      tagIndex,
                                      "pt",
                                      e.target.value
                                    )
                                  }
                                  placeholder={content.media.tagPlaceholderPt.value}
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeMediaTag(item.id, tagIndex)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => addMediaTag(item.id)}
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              {content.media.addTag}
                            </Button>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeMedia(item.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove Media
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="flex gap-2">
            <div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleMediaUpload("image", e)}
                className="hidden"
                id="media-image-upload"
              />
              <Button
                variant="outline"
                disabled={uploadingMediaId !== null}
                asChild
              >
                <label htmlFor="media-image-upload" className="cursor-pointer">
                  {uploadingMediaId !== null ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {content.form.uploading}
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      {content.media.uploadImage}
                    </>
                  )}
                </label>
              </Button>
            </div>
            <div>
              <input
                type="file"
                accept="video/*"
                multiple
                onChange={(e) => handleMediaUpload("video", e)}
                className="hidden"
                id="media-video-upload"
              />
              <Button
                variant="outline"
                disabled={uploadingMediaId !== null}
                asChild
              >
                <label htmlFor="media-video-upload" className="cursor-pointer">
                  {uploadingMediaId !== null ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {content.form.uploading}
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      {content.media.uploadVideo}
                    </>
                  )}
                </label>
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4 mt-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {content.departments.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {content.departments.description}
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {departments.map((dept, index) => (
              <AccordionItem key={dept.id} value={dept.id} className="border rounded-lg">
                <div className="flex items-center px-4 gap-2 w-full">
                  <div className="flex flex-col gap-1 py-2">
                    <button
                      type="button"
                      className="h-5 w-5 inline-flex items-center justify-center rounded-md hover:bg-accent disabled:opacity-50"
                      onClick={() => moveDepartment(index, "up")}
                      disabled={index === 0}
                    >
                      <ChevronUp className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      className="h-5 w-5 inline-flex items-center justify-center rounded-md hover:bg-accent disabled:opacity-50"
                      onClick={() => moveDepartment(index, "down")}
                      disabled={index === departments.length - 1}
                    >
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </div>
                  <AccordionTrigger className="px-2 hover:no-underline w-full! max-w-full! grow flex flex-row items-center justify-between">
                    <span className="font-medium">
                      {dept.title.en || dept.title.pt || `Department ${index + 1}`}
                    </span>
                  </AccordionTrigger>
                </div>
                <AccordionContent className="px-4 pb-4 space-y-4 overflow-y-auto">
                  <Tabs defaultValue="en" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="en">
                        {content.form.languages.english}
                      </TabsTrigger>
                      <TabsTrigger value="pt">
                        {content.form.languages.portuguese}
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="en" className="space-y-4">
                      <div>
                        <Label>{content.departments.departmentTitle}</Label>
                        <Input
                          value={dept.title.en}
                          onChange={(e) =>
                            updateDepartment(dept.id, "title", {
                              ...dept.title,
                              en: e.target.value,
                            })
                          }
                          placeholder={
                            content.departments.departmentTitlePlaceholderEn.value
                          }
                        />
                      </div>
                      <div>
                        <Label>{content.departments.departmentDescription}</Label>
                        <Textarea
                          value={dept.description.en}
                          onChange={(e) =>
                            updateDepartment(dept.id, "description", {
                              ...dept.description,
                              en: e.target.value,
                            })
                          }
                          placeholder={
                            content.departments.departmentDescriptionPlaceholderEn
                              .value
                          }
                          rows={4}
                        />
                      </div>
                      <div>
                        <Label>{content.departments.bulletPoints}</Label>
                        {dept.bulletPoints.map((bp, bpIndex) => (
                          <div key={bpIndex} className="flex gap-2 mt-2">
                            <Input
                              value={bp.en}
                              onChange={(e) =>
                                updateBulletPoint(
                                  dept.id,
                                  bpIndex,
                                  "en",
                                  e.target.value
                                )
                              }
                              placeholder={
                                content.departments.bulletPointPlaceholderEn.value
                              }
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeBulletPoint(dept.id, bpIndex)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => addBulletPoint(dept.id)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          {content.departments.addBulletPoint}
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="pt" className="space-y-4">
                      <div>
                        <Label>{content.departments.departmentTitle}</Label>
                        <Input
                          value={dept.title.pt}
                          onChange={(e) =>
                            updateDepartment(dept.id, "title", {
                              ...dept.title,
                              pt: e.target.value,
                            })
                          }
                          placeholder={
                            content.departments.departmentTitlePlaceholderPt.value
                          }
                        />
                      </div>
                      <div>
                        <Label>{content.departments.departmentDescription}</Label>
                        <Textarea
                          value={dept.description.pt}
                          onChange={(e) =>
                            updateDepartment(dept.id, "description", {
                              ...dept.description,
                              pt: e.target.value,
                            })
                          }
                          placeholder={
                            content.departments.departmentDescriptionPlaceholderPt
                              .value
                          }
                          rows={4}
                        />
                      </div>
                      <div>
                        <Label>{content.departments.bulletPoints}</Label>
                        {dept.bulletPoints.map((bp, bpIndex) => (
                          <div key={bpIndex} className="flex gap-2 mt-2">
                            <Input
                              value={bp.pt}
                              onChange={(e) =>
                                updateBulletPoint(
                                  dept.id,
                                  bpIndex,
                                  "pt",
                                  e.target.value
                                )
                              }
                              placeholder={
                                content.departments.bulletPointPlaceholderPt.value
                              }
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeBulletPoint(dept.id, bpIndex)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => addBulletPoint(dept.id)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          {content.departments.addBulletPoint}
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div>
                    <Label>{content.departments.gallery}</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {dept.gallery.map((img, imgIndex) => (
                        <div key={imgIndex} className="relative">
                          <div className="relative h-20 w-28 overflow-hidden border bg-muted">
                            <Image
                              src={img.url}
                              alt={img.alt.en || `Image ${imgIndex + 1}`}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-5 w-5"
                            onClick={() => removeGalleryImage(dept.id, imgIndex)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleGalleryUpload(dept.id, e)}
                      className="hidden"
                      id={`gallery-upload-${dept.id}`}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      disabled={uploadingDeptId === dept.id}
                      asChild
                    >
                      <label
                        htmlFor={`gallery-upload-${dept.id}`}
                        className="cursor-pointer"
                      >
                        {uploadingDeptId === dept.id ? (
                          <>
                            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                            {content.form.uploading}
                          </>
                        ) : (
                          <>
                            <Plus className="h-3 w-3 mr-1" />
                            {content.departments.addImage}
                          </>
                        )}
                      </label>
                    </Button>
                  </div>

                  <div className="pt-4 border-t">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeDepartment(dept.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove Department
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Button variant="outline" onClick={addDepartment}>
            <Plus className="h-4 w-4 mr-2" />
            {content.departments.addDepartment}
          </Button>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between pt-6 border-t">
        <div className="text-sm">
          {hasChanges ? (
            <span className="text-amber-600 dark:text-amber-500">
              {content.form.unsavedChanges}
            </span>
          ) : (
            <span className="text-muted-foreground">
              {content.form.noChanges}
            </span>
          )}
        </div>
        <Button onClick={handleSave} disabled={isPending || !hasChanges}>
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {content.form.saving}
            </>
          ) : (
            content.form.save
          )}
        </Button>
      </div>
    </div>
  );
}
