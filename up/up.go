package main

import (
	"net/http"
	"time"
	"fmt"
	"text/tabwriter"
	"os"
)

type Target struct {
	Name, Data string
}

type Targets []Target

func output(targets Targets) {
	w := tabwriter.NewWriter(os.Stdout, 0, 0, 1, ' ', uint(0))
	for _, target := range targets {
		fmt.Fprintln(w, target.Name, "\t", target.Data)
	}
	w.Flush()
}

var client = &http.Client{
	Timeout: 3 * time.Second,
}

func bazooka(targets Targets) { // expoiting slice contents are pointers
	for i, target := range targets {
		res, err := client.Get(target.Data)
		if err != nil {
			targets[i].Data = "unavailable"
			continue
		}
		defer res.Body.Close()
		targets[i].Data = res.Status
	}
}

func main() {
	targets := Targets{
		{"es", "http://127.0.0.1:9200"},
		{"kibana", "http://127.0.0.1:5601/api/status"},
		{"apmsrv", "http://127.0.0.1:8200"},
		{"proxy", "https://127.0.0.1/ping"},
	}
	bazooka(targets)
	output(targets)
}
