'use client';

import { PageWithNav } from "@/components/templates/page-with-nav";
import { Section } from "@/components/templates/section";
import { Button } from "@/components/ui/button";
import { CardList } from "@/components/ui/card/card-list";
import { CardStore } from "@/components/ui/card/store";

export default function Home() {
  return (
    <PageWithNav>
      <Section header="Pick a restaurant">
        <Button
          label="hello"
          leftIcon="add"
          rightIcon="arrow_forward"
          type="ghost"
          size="xs"
          onClick={() => console.log('hello world')} />
        <CardList>
          <CardStore url="/images/restaurant/sushiro.png" label="Sushiro" />
          <CardStore url="/images/restaurant/teenoi.png" label="Teenoi" />
          <CardStore url="/images/restaurant/teenoi.png" label="Teenoi" />
          <CardStore url="/images/restaurant/teenoi.png" label="Teenoi" />
        </CardList>
      </Section>


    </PageWithNav>
  );
}
