import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const { width } = Dimensions.get('window');

// Componente de Tarefas
const TasksScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskId, setTaskId] = useState(1);

  const addTask = () => {
    if (newTask.trim() === '') {
      Alert.alert('Erro', 'Por favor, digite uma tarefa!');
      return;
    }

    const task = {
      id: taskId.toString(),
      text: newTask.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      priority: 'medium',
    };

    setTasks([...tasks, task]);
    setNewTask('');
    setTaskId(taskId + 1);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    Alert.alert(
      'Confirmar',
      'Tem certeza que deseja deletar esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: () => setTasks(tasks.filter(task => task.id !== id))
        }
      ]
    );
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity
        style={styles.taskContent}
        onPress={() => toggleTask(item.id)}
      >
        <View style={[
          styles.checkbox,
          item.completed && styles.checkboxCompleted
        ]}>
          {item.completed && (
            <Ionicons name="checkmark" size={16} color="#fff" />
          )}
        </View>
        <Text style={[
          styles.taskText,
          item.completed && styles.taskTextCompleted
        ]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTask(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#ff6b6b" />
      </TouchableOpacity>
    </View>
  );

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>📋 Minhas Tarefas</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{totalTasks}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{completedTasks}</Text>
            <Text style={styles.statLabel}>Concluídas</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite uma nova tarefa..."
            placeholderTextColor="#999"
            value={newTask}
            onChangeText={setNewTask}
            onSubmitEditing={addTask}
            returnKeyType="done"
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {tasks.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="checkmark-circle-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>Nenhuma tarefa ainda</Text>
          </View>
        ) : (
          <FlatList
            data={tasks}
            renderItem={renderTask}
            keyExtractor={(item) => item.id}
            style={styles.taskList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

// Componente de Perfil
const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Usuário',
    email: 'usuario@email.com',
    phone: '(11) 99999-9999',
    location: 'São Paulo, SP',
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#ff6b6b', '#ee5a24']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>👤 Meu Perfil</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={80} color="#667eea" />
          </View>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Ionicons name="person-outline" size={20} color="#666" />
              <Text style={styles.infoLabel}>Nome:</Text>
              <Text style={styles.infoValue}>{userInfo.name}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Ionicons name="mail-outline" size={20} color="#666" />
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{userInfo.email}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Ionicons name="call-outline" size={20} color="#666" />
              <Text style={styles.infoLabel}>Telefone:</Text>
              <Text style={styles.infoValue}>{userInfo.phone}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Ionicons name="location-outline" size={20} color="#666" />
              <Text style={styles.infoLabel}>Localização:</Text>
              <Text style={styles.infoValue}>{userInfo.location}</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="camera-outline" size={24} color="#fff" />
            <Text style={styles.actionButtonText}>Alterar Foto</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="settings-outline" size={24} color="#fff" />
            <Text style={styles.actionButtonText}>Configurações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Componente de Dashboard
const DashboardScreen = () => {
  const [stats, setStats] = useState({
    tasksCompleted: 12,
    tasksPending: 5,
    streak: 7,
    productivity: 85,
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4ecdc4', '#44a08d']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>📊 Dashboard</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={40} color="#4CAF50" />
            <Text style={styles.statCardNumber}>{stats.tasksCompleted}</Text>
            <Text style={styles.statCardLabel}>Tarefas Concluídas</Text>
          </View>
          
          <View style={styles.statCard}>
            <Ionicons name="time-outline" size={40} color="#FF9800" />
            <Text style={styles.statCardNumber}>{stats.tasksPending}</Text>
            <Text style={styles.statCardLabel}>Tarefas Pendentes</Text>
          </View>
          
          <View style={styles.statCard}>
            <Ionicons name="flame" size={40} color="#FF5722" />
            <Text style={styles.statCardNumber}>{stats.streak}</Text>
            <Text style={styles.statCardLabel}>Sequência (dias)</Text>
          </View>
          
          <View style={styles.statCard}>
            <Ionicons name="trending-up" size={40} color="#2196F3" />
            <Text style={styles.statCardNumber}>{stats.productivity}%</Text>
            <Text style={styles.statCardLabel}>Produtividade</Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>📈 Progresso Semanal</Text>
          <View style={styles.chart}>
            {[65, 80, 45, 90, 70, 85, 95].map((height, index) => (
              <View
                key={index}
                style={[
                  styles.chartBar,
                  { height: height, backgroundColor: `hsl(${120 + index * 20}, 70%, 50%)` }
                ]}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Navegação Principal
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Tasks') {
            iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
          } else if (route.name === 'Dashboard') {
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#667eea',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
        },
      })}
    >
      <Tab.Screen name="Tasks" component={TasksScreen} options={{ title: 'Tarefas' }} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
  );
};

// App Principal
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      <MainTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#667eea',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 15,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    marginTop: 2,
  },
  // Profile Styles
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    gap: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    minWidth: 80,
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  actionsContainer: {
    gap: 15,
  },
  actionButton: {
    backgroundColor: '#667eea',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Dashboard Styles
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: (width - 60) / 2,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statCardNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  statCardLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 150,
  },
  chartBar: {
    width: 30,
    borderRadius: 15,
    marginHorizontal: 2,
  },
});
