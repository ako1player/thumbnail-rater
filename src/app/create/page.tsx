"use client";
import React, { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { UploadButton, UploadFileResponse } from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
import { Button } from "../../components/ui/button";
import Image from "next/image";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useToast } from "../../components/ui/use-toast";
import clsx from "clsx";
import { divide, isEmpty } from 'lodash'
import { useRouter } from "next/navigation";

const defaultErrorState = {
  title:"",
  imageA: "",
  imageB: "",
}

function CreatePage() {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createThumbnail = useMutation(api.thumbnail.CreateThumbnail);
  const [imageA, setImageA] = useState("");
  const [imageB, setImageB] = useState("");
  const [errors, setErrors] = useState(defaultErrorState);
  const { toast } = useToast()
  const router = useRouter();

  return (
    <div className="mt-16">
      <h1 className="text-4xl font-bold mb-8">Create A Thumbnail Test</h1>

      <p className="text-lg max-w-md mb-8">
        Create your test so that other people can vote on their favorite
        thumbnail and help you redesign or pick the best options.
      </p>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          const title = formData.get("title") as string;
          let newErrors = { ...defaultErrorState,}
          setErrors(()=> newErrors)

          if(!title){
            newErrors = {
                ...newErrors,
                title: "title required"
            }
          }
          if(!imageA){
            newErrors = {
              ...newErrors,
              imageA: "Upload Image"
          }
          }
          if(!imageB){
            newErrors = {
              ...newErrors,
              imageB: "Upload Image"
          }
          }

          setErrors(newErrors);

          const hasErrors = Object.values(newErrors).some(Boolean) 
          
          if(hasErrors){
            toast({
                title: "Form Errors",
                description: "Image A or B need to be uploaded",
                variant: "destructive"
              })
            return;
          }
          
          const thumbnailId = await createThumbnail({
            aImage: imageA,
            bImage: imageB,
            title,
          });
          console.log(thumbnailId)
          router.push(`/thumbnails/${thumbnailId}`)
        }}
      >
        <div className="flex flex-col gap-4 mb-8">
          <Label htmlFor="title">Your Test Title</Label>
          <Input
            id="title"
            type="text"
            name="title"
            placeholder="Label your test to make it easier to manage later"
            className={clsx({
              border: errors.title,
              "border-red-500": errors.title,
            })}
          />
          {errors.title && <div className="text-red-500">{errors.title}</div>}
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className={clsx("flex flex-col gap-4 rounded p-2", {
            border: errors.imageA,
            "border-red-500": errors.imageA,
          })}>
            <h2 className="text-2xl font-bold">Test Image A</h2>
            {imageA && (
              <Image
                src={`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${imageA}`}
                width="200"
                height="200"
                alt="Image Test A"
              />
            )}

            <UploadButton
              uploadUrl={generateUploadUrl}
              fileTypes={["image/*"]}
              multiple
              onUploadComplete={async (uploaded: UploadFileResponse[]) => {
                setImageA((uploaded[0].response as any).storageId);
              }}
              onUploadError={(error: unknown) => {
                // Do something with the error.
                alert(`ERROR! ${error}`);
              }}
            />
            
            {errors.imageA && (<div className="text-red-500">{errors.imageA}</div> )}
          </div>
          <div className={clsx("flex flex-col gap-4 rounded p-2", {
            border: errors.imageB,
            "border-red-500": errors.imageB,
          })}>
            <h2 className="text-2xl font-bold">Test Image B</h2>
            {imageA && (
              <Image
                src={`${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${imageB}`}
                width="200"
                height="200"
                alt="Image Test A"
              />
            )}

            <UploadButton
              uploadUrl={generateUploadUrl}
              fileTypes={["image/*"]}
              multiple
              onUploadComplete={async (uploaded: UploadFileResponse[]) => {
                setImageB((uploaded[0].response as any).storageId);
              }}
              onUploadError={(error: unknown) => {
                // Do something with the error.
                alert(`ERROR! ${error}`);
              }}
            />

              {errors.imageB && (<div className="text-red-500">{errors.imageB}</div>) }
          </div>
        </div>

        <Button>Create Thumbnail</Button>
      </form>
    </div>
  );
}

export default CreatePage;
