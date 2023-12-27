#include <filesystem>
#include <string>
#include <vector>
#include <iostream>

namespace fs = std::filesystem;

int main(){
    std::string path = "./";
    std::vector<std::string> already_names;
    for (const auto & entry : fs::directory_iterator(path)){
            const std::string name = entry.path().string().substr(2,entry.path().string().length()-2);
            if(name[0] != 'b' && name[0] != 'e'){
                if(name[1] == 's'){
                    const std::string new_name = name.substr(0,1) + 'o' + name.substr(2,5);
                    std::cout << "OLD: " << entry.path() << "NEW: " << new_name << std::endl;
                    rename(entry,new_name.c_str());
                }else{
                    const std::string new_name = name.substr(0,1) + 't' + name.substr(1,5);
                    std::cout << "OLD: " << entry.path() << "NEW: " << new_name << std::endl;
                    rename(entry,new_name.c_str());
                }
            }
    }
        
}