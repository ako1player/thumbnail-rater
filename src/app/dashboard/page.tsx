"use client"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
  } from "@/components/ui/card"
import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import Image from "next/image"
import { getImageUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { formatDistance } from "date-fns"

export default function DashboardPage(){

    const thumbnails = useQuery(api.thumbnail.getThumbnailsForUser)

    const sortedThumbnails = [...(thumbnails ?? [])].reverse();

    return( 
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {sortedThumbnails?.map((thumbnail) => {
            return(
                <Card key={thumbnail._id}>
                    <CardHeader>
                        <Image
                            src={getImageUrl(thumbnail.aImage)}
                            width="600"
                            height="600"
                            alt="thumbnail Image"
                        />
                        
                    </CardHeader>
                    <CardContent>
                        <p>{thumbnail.title}</p>
                        <p>{formatDistance(thumbnail._creationTime, new Date(), { addSuffix: true })}</p>
                        <p>Votes: {thumbnail.aVotes + thumbnail.bVotes}</p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" asChild>
                            <Link href={`/thumbnails/${thumbnail._id}`}>
                                View Results
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            );
        })}
    </div>
    )
}