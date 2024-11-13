"use client";

import { useRouter } from "next/navigation";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

export default function CardDemo(email: any) {
  const router = useRouter();
  const list = [
    {
      title: "Prenda 1",
      img: "https://images.pexels.com/photos/6786666/pexels-photo-6786666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: getFecha(),
    },
    {
      title: "Prenda 2",
      img: "https://images.pexels.com/photos/6786666/pexels-photo-6786666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: getFecha(),
    },
    {
      title: "Prenda 3",
      img: "https://images.pexels.com/photos/6786666/pexels-photo-6786666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: getFecha(),
    },
    {
      title: "Prenda 4",
      img: "https://images.pexels.com/photos/6786666/pexels-photo-6786666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: getFecha(),
    },
    {
      title: "Prenda 5",
      img: "https://images.pexels.com/photos/6786666/pexels-photo-6786666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: getFecha(),
    },
    {
      title: "Prenda 6",
      img: "https://images.pexels.com/photos/6786666/pexels-photo-6786666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: getFecha(),
    },
    {
      title: "Prenda 7",
      img: "https://images.pexels.com/photos/6786666/pexels-photo-6786666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: getFecha(),
    },
    {
      title: "Prenda 8",
      img: "https://images.pexels.com/photos/6786666/pexels-photo-6786666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: getFecha(),
    },
    {
      title: "Prenda 9",
      img: "https://images.pexels.com/photos/6786666/pexels-photo-6786666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: getFecha(),
    },
    {
      title: "Prenda 10",
      img: "https://images.pexels.com/photos/6786666/pexels-photo-6786666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: getFecha(),
    },
    {
      title: "Prenda 11",
      img: "https://images.pexels.com/photos/6786666/pexels-photo-6786666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: getFecha(),
    },
  ];

  function getFecha() {
    const hoy = Date.now();
    const today = new Date(hoy);
    return today.toLocaleDateString();
  }

  return (
    <div className="gap-2 gap-y-4 grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => (
        <Card
          shadow="sm"
          key={index}
          isPressable
          onPress={() => {
            const prenda = encodeURIComponent(item.title);
            router.push(`/users/${email.email}/${prenda}`);
          }}
          className="w-60"
        >
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-cover h-[140px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.date}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
