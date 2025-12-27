import { type Category } from "@/types/rss";

export const handleXml = (data: string) => {
    const doc: Document = new DOMParser().parseFromString(data, "text/xml");

    const feed: Category = {
        title: doc.querySelector("channel > title")?.textContent ?? "",
        description: doc.querySelector("channel > description")?.textContent ?? "",
        generator: doc.querySelector("channel > generator")?.textContent ?? "",
        link: doc.querySelector("channel > link")?.textContent ?? "",
        language: doc.querySelector("channel > language")?.textContent ?? "",
        copyright: doc.querySelector("channel > copyright")?.textContent ?? "",
        ttl: Number(doc.querySelector("channel > ttl")?.textContent ?? 0),
        pubDate: doc.querySelector("channel > pubDate")?.textContent ?? "",
        image: {
            url: doc.querySelector("channel > image > url")?.textContent ?? "",
            title: doc.querySelector("channel > image > title")?.textContent ?? "",
            link: doc.querySelector("channel > image > link")?.textContent ?? "",
        },
        items: Array.from(doc.querySelectorAll("channel > item")).map((item) => ({
            title: item.querySelector("title")?.textContent ?? "",
            link: item.querySelector("link")?.textContent ?? "",
            pubDate: item.querySelector("pubDate")?.textContent ?? "",
            description: item.querySelector("description")?.textContent ?? "",
            guid: item.querySelector("guid")?.textContent ?? "",
        })),
    };
    return feed;
}