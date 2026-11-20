import "./global.css";
import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const PALABRAS: string[] = [
  "Playa",
  "Sartén",
  "Patata",
  "Astronauta",
  "Hospital",
  "Guitarra",
  "Pingüino",
  "Submarino",
  "Volcán",
  "Bibliotecario",
  "Pizza",
  "Reloj",
  "Castillo",
  "Helicóptero",
  "Paraguas",
];

const OPCIONES_JUGADORES: number[] = [3, 4, 5, 6, 7, 8];

const REGLAS_Y_COMO_JUGAR: string[] = [
  "Se reúnen entre 3 y 8 jugadores; la mayoría recibe la misma palabra secreta y uno es el impostor (no conoce la palabra).",
  "Pasen el teléfono en orden para que cada jugador toque su turno y vea su rol en secreto.",
  "Por turnos, digan una palabra o concepto relacionado con la palabra secreta sin dar pistas demasiado obvias.",
  "El impostor debe fingir que conoce la palabra y dar pistas creíbles para no ser descubierto.",
  "Al terminar la ronda de pistas, debatan y voten por quién creen que es el impostor.",
  "Si atrapan al impostor, gana el grupo; si el impostor sobrevive a la votación, gana él.",
];

type RolJugador = "IMPOSTOR" | string;

interface EncabezadoProps {
  subtitulo?: string;
  titulo: string;
}

function Encabezado({ titulo, subtitulo }: EncabezadoProps): React.JSX.Element {
  return (
    <View className="items-center">
      {subtitulo ? (
        <Text className="text-xs font-bold uppercase tracking-widest text-orange-600 text-center">
          {subtitulo}
        </Text>
      ) : null}
      <Text className="text-3xl font-extrabold text-orange-950 mt-0.5 text-center">
        {titulo}
      </Text>
    </View>
  );
}


interface PantallaInicioProps {
  numJugadores: number;
  onSeleccionarJugadores: (cantidad: number) => void;
  onIniciarJuego: () => void;
}

function PantallaInicio({
  numJugadores,
  onSeleccionarJugadores,
  onIniciarJuego,
}: PantallaInicioProps): React.JSX.Element {
  const filas: number[][] = [
    [3, 4],
    [5, 6],
    [7, 8],
  ];

  return (
    <View className="bg-orange-50/70 border border-orange-200 rounded-3xl p-4">
      <Text className="text-base font-bold text-orange-950 text-center">
        ¿Cuántos jugadores participarán?
      </Text>
      <Text className="text-xs text-orange-700/80 text-center mt-0.5 mb-3">
        Elige entre 3 y 8 personas
      </Text>

      <View className="gap-2 mb-4">
        {filas.map((par, filaIndex) => (
          <View key={`fila-${filaIndex}`} className="flex-row gap-2">
            {par.map((cantidad) => {
              const seleccionado = numJugadores === cantidad;
              return (
                <Pressable
                  key={cantidad}
                  onPress={() => onSeleccionarJugadores(cantidad)}
                  className={`flex-1 h-11 rounded-xl items-center justify-center border ${
                    seleccionado
                      ? "bg-orange-500 border-orange-600"
                      : "bg-white border-orange-200 active:bg-orange-100"
                  }`}
                >
                  <Text
                    className={`text-base font-bold ${
                      seleccionado ? "text-white" : "text-orange-950"
                    }`}
                  >
                    {cantidad} jugadores
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>

      <Pressable
        onPress={onIniciarJuego}
        className="bg-orange-600 active:bg-orange-700 py-3.5 rounded-2xl items-center"
      >
        <Text className="text-white font-extrabold text-base">
          Iniciar Juego
        </Text>
      </Pressable>
    </View>
  );
}

interface PantallaTurnoProps {
  jugadorActual: number;
  numJugadores: number;
  rolActual: RolJugador | undefined;
  mostrandoRol: boolean;
  onMostrarRol: () => void;
  onSiguienteJugador: () => void;
}

function PantallaTurno({
  jugadorActual,
  numJugadores,
  rolActual,
  mostrandoRol,
  onMostrarRol,
  onSiguienteJugador,
}: PantallaTurnoProps): React.JSX.Element {
  const esImpostor = rolActual === "IMPOSTOR";
  const esUltimoJugador = jugadorActual + 1 >= numJugadores;

  return (
    <View className="bg-orange-50/70 border border-orange-200 rounded-3xl p-5 items-center gap-4">
      <View className="bg-orange-100 border border-orange-300 px-3.5 py-1 rounded-full">
        <Text className="text-orange-700 font-bold text-xs">
          Jugador {jugadorActual + 1} de {numJugadores}
        </Text>
      </View>

      {!mostrandoRol ? (
        <Pressable
          onPress={onMostrarRol}
          className="w-full bg-white border-2 border-dashed border-orange-400 rounded-2xl p-6 items-center active:bg-orange-100/60"
        >
          <Text className="text-orange-950 text-lg font-bold text-center">
            Jugador {jugadorActual + 1}, toca para ver tu rol
          </Text>
          <Text className="text-orange-700/80 text-xs text-center mt-2">
            Asegúrate de que nadie más mire la pantalla
          </Text>
        </Pressable>
      ) : (
        <View className="w-full items-center">
          {esImpostor ? (
            <View className="w-full bg-orange-100 border-2 border-orange-600 rounded-2xl p-5 items-center">
              <Text className="text-orange-700 text-xs font-bold uppercase tracking-widest mb-1">
                Tu identidad secreta
              </Text>
              <Text className="text-orange-600 text-2xl font-black text-center">
                Eres el IMPOSTOR
              </Text>
              <Text className="text-orange-950/80 text-xs text-center mt-2">
                No conoces la palabra. Escucha a los demás y disimula.
              </Text>
            </View>
          ) : (
            <View className="w-full bg-white border-2 border-orange-500 rounded-2xl p-5 items-center">
              <Text className="text-orange-600 text-xs font-bold uppercase tracking-widest mb-1">
                Tu palabra secreta
              </Text>
              <Text className="text-orange-950 text-xl font-bold text-center">
                La palabra es:{" "}
                <Text className="text-orange-600 font-black">
                  {rolActual}
                </Text>
              </Text>
              <Text className="text-orange-900/75 text-xs text-center mt-2">
                Da pistas sutiles sin regalar la palabra al impostor.
              </Text>
            </View>
          )}
        </View>
      )}

      {mostrandoRol && (
        <Pressable
          onPress={onSiguienteJugador}
          className="w-full bg-orange-600 active:bg-orange-700 py-3.5 rounded-2xl items-center"
        >
          <Text className="text-white font-bold text-sm">
            {esUltimoJugador ? "Comenzar ronda" : "Siguiente jugador"}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

interface PantallaRondaProps {
  onNuevaRonda: () => void;
}

function PantallaRonda({
  onNuevaRonda,
}: PantallaRondaProps): React.JSX.Element {
  return (
    <View className="bg-orange-50/70 border border-orange-200 rounded-3xl p-5 items-center gap-3">
      <Text className="text-xl font-extrabold text-orange-950 text-center">
        ¡Todos conocen su rol!
      </Text>
      <Text className="text-orange-900/85 text-sm text-center leading-5">
        Por turnos, cada jugador debe decir una palabra o concepto relacionado
        con la palabra secreta. ¡Descubran quién miente!
      </Text>
      <Pressable
        onPress={onNuevaRonda}
        className="w-full bg-orange-600 active:bg-orange-700 py-3.5 rounded-2xl items-center mt-1"
      >
        <Text className="text-white font-extrabold text-sm">
          Nueva palabra (mismos jugadores)
        </Text>
      </Pressable>
    </View>
  );
}

interface ReglasYComoJugarProps {
  reglas: string[];
}

function ReglasYComoJugar({
  reglas,
}: ReglasYComoJugarProps): React.JSX.Element {
  return (
    <View className="bg-orange-50/70 border border-orange-200 rounded-3xl p-4 gap-2.5">
      <Text className="text-sm font-extrabold uppercase tracking-wider text-orange-700">
        Reglas y cómo jugar
      </Text>
      <View className="gap-2">
        {reglas.map((regla, index) => (
          <View key={`regla-${index}`} className="flex-row items-start gap-2">
            <Text className="text-xs font-extrabold text-orange-600 mt-0.5">
              {index + 1}.
            </Text>
            <Text className="flex-1 text-xs text-black leading-4">
              {regla}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

interface PieJuegoProps {
  juegoIniciado: boolean;
  onReiniciarJuego: () => void;
}

function PieJuego({
  juegoIniciado,
  onReiniciarJuego,
}: PieJuegoProps): React.JSX.Element {
  return (
    <View className="items-center">
      {juegoIniciado ? (
        <Pressable
          onPress={onReiniciarJuego}
          className="px-5 py-2.5 rounded-xl bg-white border border-orange-300 active:bg-orange-50"
        >
          <Text className="text-orange-700 font-semibold text-xs">
            Reiniciar juego
          </Text>
        </Pressable>
      ) : (
        <Text className="text-orange-800/60 text-xs">
          Pasa el teléfono entre jugadores para jugar
        </Text>
      )}
    </View>
  );
}

export default function App(): React.JSX.Element {
  const [numJugadores, setNumJugadores] = useState<number>(4);
  const [juegoIniciado, setJuegoIniciado] = useState<boolean>(false);
  const [jugadorActual, setJugadorActual] = useState<number>(0);
  const [roles, setRoles] = useState<RolJugador[]>([]);
  const [mostrandoRol, setMostrandoRol] = useState<boolean>(false);
  const [todosVieronRol, setTodosVieronRol] = useState<boolean>(false);

  const iniciarJuego = (): void => {
    const palabraAleatoria =
      PALABRAS[Math.floor(Math.random() * PALABRAS.length)];
    const indiceImpostor = Math.floor(Math.random() * numJugadores);

    const nuevosRoles: RolJugador[] = Array.from(
      { length: numJugadores },
      (_, index) => (index === indiceImpostor ? "IMPOSTOR" : palabraAleatoria)
    );

    setRoles(nuevosRoles);
    setJugadorActual(0);
    setMostrandoRol(false);
    setTodosVieronRol(false);
    setJuegoIniciado(true);
  };

  const siguienteJugador = (): void => {
    setMostrandoRol(false);
    if (jugadorActual + 1 < numJugadores) {
      setJugadorActual(jugadorActual + 1);
    } else {
      setTodosVieronRol(true);
    }
  };

  const reiniciarJuego = (): void => {
    setJuegoIniciado(false);
    setJugadorActual(0);
    setRoles([]);
    setMostrandoRol(false);
    setTodosVieronRol(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="flex-1 px-5 py-4 justify-center gap-5">
        <Encabezado subtitulo="" titulo="El Impostor" />

        {!juegoIniciado && (
          <>
            <PantallaInicio
              numJugadores={numJugadores}
              onSeleccionarJugadores={setNumJugadores}
              onIniciarJuego={iniciarJuego}
            />
            <ReglasYComoJugar reglas={REGLAS_Y_COMO_JUGAR} />
          </>
        )}

        {juegoIniciado && !todosVieronRol && (
          <PantallaTurno
            jugadorActual={jugadorActual}
            numJugadores={numJugadores}
            rolActual={roles[jugadorActual]}
            mostrandoRol={mostrandoRol}
            onMostrarRol={() => setMostrandoRol(true)}
            onSiguienteJugador={siguienteJugador}
          />
        )}

        {juegoIniciado && todosVieronRol && (
          <PantallaRonda onNuevaRonda={iniciarJuego} />
        )}

        <PieJuego
          juegoIniciado={juegoIniciado}
          onReiniciarJuego={reiniciarJuego}
        />
      </View>
    </SafeAreaView>
  );
}