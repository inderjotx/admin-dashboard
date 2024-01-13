import { UserButton } from "@clerk/nextjs"

export default function Home() {
  return (
    <p>
      Hello
      <UserButton afterSignOutUrl="/loda" />
    </p>
  )
}
