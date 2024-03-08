"use client"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
  } from "@/components/ui/card"
import { usePaginatedQuery, useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import Image from "next/image"
import { getImageUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { formatDistance } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Doc } from "../../../convex/_generated/dataModel"
import { useSession } from "@clerk/nextjs"

export default function ExplorePage(){

    const {results: thumbnails, status, loadMore} = usePaginatedQuery(
        api.thumbnail.getRecentThumbnails,
        {},
        {initialNumItems: 10}
    )

    const session = useSession();

    function hasVoted(thumbnail: Doc<"thumbnails">){
        if (!session.session?.id) return false;
        return thumbnail.voteIds.includes(session.session?.user.id)
    }
    return( 
    <div>
    <div className="mb-12 mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {thumbnails?.map((thumbnail) => {
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
                        <div className="flex gap-4 items-center mb-2">
                            <Avatar>
                                <AvatarImage src={thumbnail.profileImage} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p>{thumbnail.name}</p>
                            <p>{formatDistance(thumbnail._creationTime, new Date(), { addSuffix: true })}</p>
                        </div>
                        <p>{thumbnail.title}</p>
                        <p>Votes: {thumbnail.aVotes + thumbnail.bVotes}</p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" asChild variant={hasVoted(thumbnail) ? "outline" : "default"}>
                            <Link href={`/thumbnails/${thumbnail._id}`}>
                                {hasVoted(thumbnail) ? 'View Results' : 'Vote'}
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            );
        })}
    </div>
    <Button className="w-full mb-24" disabled={status !== "CanLoadMore"} onClick={()=> loadMore(10)}>Load More</Button>
    </div>
    )
}