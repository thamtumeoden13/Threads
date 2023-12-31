import { formatDateString } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

interface Props {
    id: string;
    currentUserId: string;
    parentId: string | null;
    content: string;
    author: {
        id: string;
        name: string;
        image: string;
    };
    community: {
        id: string;
        name: string;
        image: string;
    } | null;
    createdAt: string;
    comments: {
        author: {
            iamge: string;
        }
    }[];
    isComment?: boolean
}

const ThreadCard = ({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    isComment
}: Props
) => {
    console.log('ThreadCard_community', community)
    return (
        <article className={`flex flex-col w-full rounded-xl ${isComment ? 'px-0 xs:px-7' : 'bg-dark-2 p-7'}`}>
            <div className="flex items-start justify-between">
                <div className="flex flex-row flex-1 w-full gap-4">
                    <div className="flex flex-col items-center">
                        <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
                            <Image
                                src={author.image}
                                alt="Profile image"
                                fill
                                className="cursor-pointer rounded-full"
                            />
                        </Link>

                        <div className="thread-card_bar" />
                    </div>

                    <div className="flex flex-col w-full">
                        <Link href={`/profile/${author.id}`} className="w-fit">
                            <h4 className="cursor-pointer text-base-semibold text-light-1">
                                {author.name}
                            </h4>
                        </Link>

                        <h2 className="mt-2 text-small-regular text-light-2">
                            {content}
                        </h2>

                        <div className={`${isComment && 'mb-10'} flex flex-col mt-5 gap-3`}>
                            <div className="flex gap-3.5">
                                <Image
                                    src={"/assets/heart-gray.svg"}
                                    alt="heart"
                                    height={24}
                                    width={24}
                                    className="cursor-pointer object-contain"
                                />
                                <Link href={`/thread/${id}`}>
                                    <Image
                                        src={"/assets/reply.svg"}
                                        alt="reply"
                                        height={24}
                                        width={24}
                                        className="cursor-pointer object-contain"
                                    />
                                </Link>
                                <Image
                                    src={"/assets/repost.svg"}
                                    alt="repost"
                                    height={24}
                                    width={24}
                                    className="cursor-pointer object-contain"
                                />
                                <Image
                                    src={"/assets/share.svg"}
                                    alt="share"
                                    height={24}
                                    width={24}
                                    className="cursor-pointer object-contain"
                                />
                            </div>

                            {isComment && comments.length > 0 && (
                                <Link href={`/thread/${id}`}>
                                    <p className="mt-1 text-subtle-medium text-gray-1">
                                        {comments.length} replies.
                                    </p>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* TODO: Delete Thread */}
                {/* TODO: Show comment logos */}

            </div>
            {!isComment && community && (
                <Link
                    href={`communities/${community.id}`}
                    className="mt-5 flex items-center"
                >
                    <p className="text-subtle-medium text-gray-1">
                        {formatDateString(createdAt)}
                        {" "} - {community.name} Community
                    </p>
                    <Image
                        src={community.image}
                        alt={community.name}
                        width={14}
                        height={14}
                        className="ml-1 rouded-full object-cover"
                    />
                </Link>
            )}
        </article>
    )
}

export default ThreadCard