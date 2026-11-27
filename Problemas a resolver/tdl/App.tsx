import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function UglyTodoApp() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Arreglar este diseño horrible', completed: false },
    { id: '2', text: 'Combinar bien los colores', completed: true },
  ]);
  const [inputText, setInputText] = useState('');

  const addTask = () => {
    if (inputText.trim() === '') return;
    setTasks([
      ...tasks,
      { id: Date.now().toString(), text: inputText, completed: false },
    ]);
    setInputText('');
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-yellow-300">
        <View className="bg-fuchsia-600 p-1 border-b-8 border-lime-400">
          <Text className="text-4xl font-extrabold text-cyan-300 text-right italic underline tracking-widest">
            MIS TAREAS!!!
          </Text>
          <Text className="text-xs text-red-950 bg-orange-400 self-start px-6">
            v0.0.1 - NO TOCAR
          </Text>
        </View>

        <View className="flex-row items-end bg-blue-800 m-1 p-4 border-4 border-dashed border-red-500">
          <TextInput
            className="flex-1 bg-lime-200 text-purple-900 text-xl p-1 border-2 border-black h-20"
            placeholder="escribe algo aqui..."
            placeholderTextColor="#ff00ff"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity
            onPress={addTask}
            className="bg-red-600 ml-1 p-5 rounded-full border-4 border-yellow-400"
          >
            <Text className="text-green-300 font-black text-xs">
              METER TAREA
            </Text>
          </TouchableOpacity>
        </View>

        <View className="bg-black py-0.5 px-10 self-end mr-12">
          <Text className="text-pink-500 text-lg font-mono">
            Total: {tasks.length}
          </Text>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          className="mt-6 px-1"
          renderItem={({ item, index }) => (
            <View
              className={`flex-row justify-between items-start mb-5 p-2 border-4 ${
                index % 2 === 0
                  ? 'bg-emerald-400 border-purple-700 rounded-tl-3xl'
                  : 'bg-orange-500 border-blue-900 rounded-br-3xl'
              }`}
            >
              <TouchableOpacity
                onPress={() => toggleTask(item.id)}
                className="flex-1 pr-2"
              >
                <Text
                  className={`text-2xl ${
                    item.completed
                      ? 'line-through text-red-700 bg-yellow-200'
                      : 'text-white font-bold'
                  }`}
                >
                  {item.completed ? '[LISTO] ' : '-> '}
                  {item.text}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => deleteTask(item.id)}
                className="bg-purple-950 px-1 py-4 border-2 border-white"
              >
                <Text className="text-yellow-400 text-xs font-bold">
                  BORRAR X
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}