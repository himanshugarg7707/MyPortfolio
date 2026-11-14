#include <iostream>
#include <vector>
#include <list>
#include <queue>
using namespace std;

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

    // Print Adjacency List
    // void printAdjList() {
    //     for (int i = 0; i < V; i++) {

    //         cout << i << " : ";

    //         for (int neighbour : l[i]) {
    //             cout << neighbour << " ";
    //         }

    //         cout << endl;
    //     }
    // }
    // BFS Traversal
    void bfs(){
        queue<int> Q;
        vector<bool> vis(V,false);
        Q.push(0);
        vis[0] = true;
        while(Q.size()>0){
            int u = Q.front(); // source
            Q.pop();
            cout << u <<" ";
            for (int v:l[u]) {// v-> immidiate neighbour
                if(!vis[v]){
                    vis[v]= true;
                    Q.push(v);
                }
            }

        }
        cout  << endl;

    }

    // DFS traversal
    void dfsHelper(int u,vector<bool>&vis){ 
        // time complexity = O(V+E)
        cout << u << " ";
        vis[u] = true;
        for(int v: l[u]){
            if(!vis[v]){
                dfsHelper(v,vis);
            }
        }

    }
    void dfs(){
        int src = 0;
        vector<bool> vis(V,false);

        for(int i=0;i<V;i++){
            if(!vis[i]){
                dfsHelper(i,vis);
            }
        }
       // dfsHelper(src,vis);
        cout  << endl;
    }

    bool isCycleUndirDFS(int src,int par , vector<bool>& vis){ // O(V+E)
        vis[src] = true;
        list<int> neighbours = l[src];

        for(int v: neighbours){
            if(!vis[v]){
                if(isCycleUndirDFS(v,src, vis)){
                    return true;
                }
            }else if(v!= par){
                return true;
            }
        }
        return false;
    }

    bool isCycle(){
        vector<bool> vis(V,false);
        for (int i = 0; i < V; i++) {
            if(!vis[i]){
               if(isCycleUndirDFS(i,-1,vis)) {
                return true;
               }
            }
        }
        return false;
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
   g.isCycle();


    return 0;
}