import React, { useState, useEffect } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";

function BotsPage() {
  const [bots, setBots] = useState([]);

  const fetchData = async () => {
    try {
      const resp = await fetch(`http://localhost:8002/bots`);
      const data = await resp.json();
      setBots(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateBotStatus = (bot, armyStatus) => {
    setBots((prevBots) =>
      prevBots.map((b) => (b.id === bot.id ? { ...b, army: armyStatus } : b))
    );
  };

  const enlistBot = (bot) => {
    updateBotStatus(bot, true);
  };

  const removeBot = (bot) => {
    updateBotStatus(bot, false);
  };

  const deleteBot = (bot) => {
    const updatedBots = bots.filter((b) => b.id !== bot.id);
    setBots(updatedBots);
  };

  return (
    <div>
      <YourBotArmy
        bots={bots.filter((b) => b.army)}
        removeBot={removeBot}
        deleteBot={deleteBot}
      />
      <BotCollection bots={bots} enlistBot={enlistBot} deleteBot={deleteBot} />
    </div>
  );
}

export default BotsPage;
