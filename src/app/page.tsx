'use client';

import { PageWithNav } from "@/components/templates/page-with-nav";
import { Section } from "@/components/templates/section";
import { CardList } from "@/components/ui/card/card-list";
import { CardStore } from "@/components/ui/card/store";

export default function Home() {
  return (
    <PageWithNav>
      <Section header="Pick a restaurant">
        <CardList>
          <CardStore href="/sushiro" url="/images/restaurant/sushiro.png" label="Sushiro" />
          <CardStore url="/images/restaurant/teenoi.png" label="Teenoi" />
        </CardList>
      </Section>
    </PageWithNav>
  );
}
