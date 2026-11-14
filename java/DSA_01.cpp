#include <iostream>
#include <vector>
#include <list>
#include <queue>
using namespace std;
// BFS graph traversal to detect a cycle
class Graph {
    int V;
    list<int> *l;

public:

    // Constructor
    Graph(int V) {
        this->V = V;
        l = new list<int>[V];
    }

    // Add Edge
    void addEdge(int u, int v) {
        l[u].push_back(v);
        l[v].push_back(u);
    }

    bool isCycleBFS(int src , vector<bool> &vis){
        Queue<pair<int,int>> q;
        q.push({src,-1});
        vis[src] = true;
        while(q.size()>0){
            int u  =q.front().first;
            int parU = q.front().second;
            q.pop();

            list<int> neighbours= l[u];
            for(int v: neighbours){
                if(!vis[v]){
                    q.push({v,u}); 
                }else if(v!=parU){
                    return true;
                }
            }
        }
        return false;
    }
    bool isCycle(){
        
    }

   
    

    

    


    // Destructor
    Graph() {
        delete[] l;
    }
};

int main() {

    Graph g(5);

    g.addEdge(0, 1);
    g.addEdge(1, 2);
    g.addEdge(1, 3);
   // g.addEdge(2, 3); // for dfs traversal
    //g.addEdge(2, 4);

   // g.printAdjList();
   cout << "BFS: ";
   g.bfs();
   cout << "DFS: ";
   g.dfs();
   cout<<g.isCycle()<<endl;


    return 0;
}