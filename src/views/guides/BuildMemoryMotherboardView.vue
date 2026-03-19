<template>
    <article>
        <h1>Memory & Motherboard</h1>

        <p>
            Als Nächstes wird die SSD installiert. 
        </p>
        <p>
            Schaue zuerst in dein Mainboard-Handbuch, um den passenden M.2-Slot zu finden manche Boards haben mehrere, die unterschiedliche Geschwindigkeiten oder Protokolle unterstützen. Entferne die kleine Schraube, die den Halter für die SSD fixiert, und stecke die SSD schräg in den Slot, bis sie einrastet. Senke sie dann vorsichtig ab und befestige sie mit der Schraube.
        </p>
        <p>
            Bei SATA-SSDs verhält es sich anders: Sie werden mit einem SATA-Kabel an das Mainboard angeschlossen und erhalten zusätzlich Strom vom Netzteil. Achte darauf, dass Kabel ordentlich verlegt sind, um den Luftstrom im Gehäuse nicht zu behindern. Nach dem Einbau ist die SSD sofort betriebsbereit und kann im BIOS oder Betriebssystem erkannt werden.
        </p>
    </article>
</template>

<style scoped>
article {
  max-width: 400px;
}
 
h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  color: var(--color-text);
}
 
h2 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}
 
p {
  color: var(--color-text-muted);
  line-height: 1.8;
  margin-bottom: 1rem;
}
 
ul {
  list-style: disc;
  padding-left: 1.5rem;
  color: var(--color-text-muted);
  line-height: 1.8;
}
</style>